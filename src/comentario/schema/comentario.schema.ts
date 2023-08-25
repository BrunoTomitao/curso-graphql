import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Post } from '../../post/schema/post.schema';
import { User } from '../../user/schemas/user.schema';

@Schema()
@ObjectType()
export class Comentario {
  @Prop()
  @Field()
  id: string;

  @Prop()
  @Field()
  texto: string;

  @Prop()
  @Field()
  likes: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  @Field(() => Post, { nullable: true })
  post: Post;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field()
  usuario: User;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);
