import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/post/schema/post.schema';
import { User } from 'src/user/schemas/user.schema';
import { v4 as uuid } from 'uuid';

import { CreateComentarioInput } from './input/create-comentario.input';
import { Comentario } from './schema/comentario.schema';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectModel('Comentario')
    private readonly comentarioModel: Model<Comentario>,
    @InjectModel('Post') private readonly postModel: Model<Post>,
  ) {}

  async buscarUmComentario(id: string) {
    const comentario = await this.comentarioModel
      .findOne({
        id,
      })
      .populate(['usuario', 'post'])
      .exec();

    if (!comentario) throw new NotFoundException('Comentário não encontrado');

    return comentario;
  }

  async adicionarComentario(
    createComentarioInput: CreateComentarioInput,
    usuario: User,
  ) {
    const post = await this.postModel
      .findOne({
        id: createComentarioInput.idPost,
      })
      .populate('comentarios')
      .exec();

    if (!post) throw new NotFoundException('Post não encontrado');

    if (!post.comentarios) post.comentarios = [];

    const novoComentario = new this.comentarioModel({
      id: uuid(),
      texto: createComentarioInput.comentario,
      likes: 0,
      post,
      usuario,
    });

    post.comentarios.push(novoComentario);
    post.save();

    return novoComentario.save();
  }

  async excluirComentario(id: string) {
    const comentario = await this.buscarUmComentario(id);

    const post = await this.postModel
      .findOne({
        id: comentario.post.id,
      })
      .populate('usuario')
      .exec();

    if (!post) throw new NotFoundException('Post não encontrado');

    if (post.usuario.id !== comentario.usuario.id)
      throw new BadRequestException('Você não pode excluir esse comentário');

    post.comentarios = post.comentarios.filter(
      (comentario) => comentario.id !== id,
    );

    post.save();

    await comentario.deleteOne();

    return 'Comentário excluído com sucesso';
  }

  async darLikeComentario(id: string) {
    const comentario = await this.buscarUmComentario(id);

    comentario.likes++;

    return comentario.save();
  }

  async removerLikeComentario(id: string) {
    const comentario = await this.buscarUmComentario(id);

    comentario.likes--;

    return comentario.save();
  }
}
