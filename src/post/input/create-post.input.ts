import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @MinLength(3)
  @MaxLength(500)
  @IsString()
  @Field()
  descricao: string;

  @IsUrl()
  @Field()
  urlImagem: string;
}
