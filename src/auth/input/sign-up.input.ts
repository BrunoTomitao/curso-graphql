import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { AuthInput } from './auth.input';

@InputType()
export class SignUpInput extends PickType(AuthInput, [
  'email',
  'senha',
] as const) {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nome: string;
}
