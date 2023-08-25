import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentarioModule } from 'src/comentario/comentario.module';

import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PostSchema } from './schema/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    forwardRef(() => ComentarioModule),
  ],
  providers: [PostResolver, PostService],
  exports: [MongooseModule],
})
export class PostModule {}
