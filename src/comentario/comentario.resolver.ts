import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { User } from 'src/user/schemas/user.schema';

import { ComentarioService } from './comentario.service';
import { CreateComentarioInput } from './input/create-comentario.input';
import { Comentario } from './schema/comentario.schema';

@Resolver(() => Comentario)
export class ComentarioResolver {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Mutation(() => Comentario)
  @UseGuards(GqlAuthGuard)
  async adicionarComentario(
    @Args('createComentarioInput') createComentarioInput: CreateComentarioInput,
    @GetUser() user: User,
  ) {
    return this.comentarioService.adicionarComentario(
      createComentarioInput,
      user,
    );
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async excluirComentario(@Args('id') id: string) {
    return this.comentarioService.excluirComentario(id);
  }

  @Mutation(() => Comentario)
  @UseGuards(GqlAuthGuard)
  async buscarUmComentario(@Args('id') id: string) {
    return this.comentarioService.buscarUmComentario(id);
  }

  @Mutation(() => Comentario)
  @UseGuards(GqlAuthGuard)
  async darLikeComentario(@Args('id') id: string) {
    return this.comentarioService.darLikeComentario(id);
  }

  @Mutation(() => Comentario)
  @UseGuards(GqlAuthGuard)
  async removerLikeComentario(@Args('id') id: string) {
    return this.comentarioService.removerLikeComentario(id);
  }
}
