import { Injectable } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Injectable()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginOutput)
  async signUp(@Args('input') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
