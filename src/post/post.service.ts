import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { v4 as uuid } from 'uuid';

import { CreatePostInput } from './input/create-post.input';
import { Post } from './schema/post.schema';
import { Comentario } from 'src/comentario/schema/comentario.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    @InjectModel('Comentario')
    private readonly comentarioModel: Model<Comentario>,
  ) {}

  async criarPost(createPostInput: CreatePostInput, user: User) {
    const { descricao, urlImagem } = createPostInput;

    const post = new this.postModel({
      id: uuid(),
      descricao,
      urlImagem,
      likes: 0,
      usuario: user,
    });

    return post.save();
  }

  async listarPosts() {
    const posts = await this.postModel
      .find()
      .populate([
        {
          path: 'usuario',
          model: 'User',
        },
        {
          path: 'comentarios',
          model: 'Comentario',
          populate: {
            path: 'usuario',
            model: 'User',
          },
        },
      ])
      .exec();

    if (!posts) throw new NotFoundException('Nenhum post encontrado');

    return posts;
  }

  async visualizarPost(id: string) {
    const post = await this.postModel
      .findOne({ id })
      .populate([
        {
          path: 'usuario',
          model: 'User',
        },
        {
          path: 'comentarios',
          model: 'Comentario',
          populate: {
            path: 'usuario',
            model: 'User',
          },
        },
      ])
      .exec();

    if (!post) throw new NotFoundException('Post não encontrado');

    return post;
  }

  async editarPost(
    id: string,
    createPostInput: CreatePostInput,
    idUsuario: string,
  ) {
    const post = await this.visualizarPost(id);

    if (idUsuario !== post.usuario.id)
      throw new BadRequestException('Você não pode excluir esse post');

    await this.postModel
      .findOneAndUpdate({ id }, { $set: createPostInput })
      .exec();

    return this.visualizarPost(id);
  }

  async excluirPost(id: string, idUsuario: string) {
    const post = await this.visualizarPost(id);

    if (idUsuario !== post.usuario.id)
      throw new BadRequestException('Você não pode excluir esse post');

    if (post.comentarios.length > 0)
      for (const comentario of post.comentarios) {
        await this.comentarioModel.deleteOne({
          id: comentario.id,
        });
      }

    await this.postModel.deleteOne({
      id,
    });

    return 'Post excluído com sucesso';
  }

  async darLike(id: string) {
    const post = await this.visualizarPost(id);

    post.likes++;

    return post.save();
  }

  async removerLike(id: string) {
    const post = await this.visualizarPost(id);

    post.likes--;

    return post.save();
  }
}
