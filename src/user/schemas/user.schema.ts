import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Prop()
  @Field()
  id: string;

  @Prop()
  @Field()
  nome: string;

  @Prop()
  @Field()
  email: string;

  @Prop({
    default:
      'https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png',
  })
  @Field()
  urlFotoPerfil: string;

  @Prop()
  @HideField()
  senha: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
