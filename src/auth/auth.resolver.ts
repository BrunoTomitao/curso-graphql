import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthInput } from './input/auth.input';
import { SignUpInput } from './input/sign-up.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => String)
  async signIn(@Args('authInput') authInput: AuthInput) {
    return this.authService.signIn(authInput);
  }
}
