import { Injectable } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { SignUpInput, SignUpOutput } from './dtos/sign-up.dto';

@Injectable()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpOutput)
  async signUp(@Args('input') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
