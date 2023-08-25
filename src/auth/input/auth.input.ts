import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class AuthInput {
  @IsEmail()
  @Field()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @Field()
  @IsStrongPassword()
  @IsNotEmpty()
  @IsDefined()
  senha: string;
}
