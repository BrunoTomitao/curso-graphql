import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { User } from 'src/user/schemas/user.schema';

import { CreatePostInput } from './input/create-post.input';
import { PostService } from './post.service';
import { Post } from './schema/post.schema';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  @UseGuards(GqlAuthGuard)
  async listarPosts(): Promise<Post[]> {
    return this.postService.listarPosts();
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async criarPost(
    @GetUser() user: User,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return this.postService.criarPost(createPostInput, user);
  }

  @Query(() => Post)
  @UseGuards(GqlAuthGuard)
  async verPost(@Args('id') id: string): Promise<Post> {
    return this.postService.visualizarPost(id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async editarPost(
    @Args('id') id: string,
    @Args('createPostInput') createPostInput: CreatePostInput,
    @GetUser() user: User,
  ): Promise<Post> {
    return this.postService.editarPost(id, createPostInput, user.id);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async excluirPost(
    @Args('id') id: string,
    @GetUser() user: User,
  ): Promise<string> {
    return this.postService.excluirPost(id, user.id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async darLike(@Args('id') id: string): Promise<Post> {
    return this.postService.darLike(id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async removerLike(@Args('id') id: string): Promise<Post> {
    return this.postService.removerLike(id);
  }
}
