import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from 'src/post/post.module';

import { ComentarioResolver } from './comentario.resolver';
import { ComentarioService } from './comentario.service';
import { ComentarioSchema } from './schema/comentario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Comentario', schema: ComentarioSchema },
    ]),
    forwardRef(() => PostModule),
  ],
  providers: [ComentarioService, ComentarioResolver],
  exports: [MongooseModule],
})
export class ComentarioModule {}
