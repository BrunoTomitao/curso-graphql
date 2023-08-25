import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

import { Comentario } from '../../comentario/schema/comentario.schema';

@Schema()
@ObjectType()
export class Post {
  @Prop()
  @Field()
  id: string;

  @Prop()
  @Field()
  descricao: string;

  @Prop()
  @Field()
  urlImagem: string;

  @Prop()
  @Field()
  likes: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field()
  usuario: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario' }] })
  @Field(() => [Comentario], { nullable: true })
  comentarios: Comentario[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
