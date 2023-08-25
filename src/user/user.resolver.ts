import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';

import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async atualizarFotoPerfil(
    @Args('urlFotoPerfil') urlFotoPerfil: string,
    @GetUser() user: User,
  ) {
    return this.userService.atualizarFotoPerfil(user.id, urlFotoPerfil);
  }
}
