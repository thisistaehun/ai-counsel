import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../apis/users/entities/user.entity';
import { UsersService } from '../apis/users/users.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { SignUpInput, SignUpOutput } from './dtos/sign-up.dto';
import { AccessTokenPayload } from './types/payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async signUp(input: SignUpInput): Promise<SignUpOutput> {
    const user = await this.usersService.create(input);

    const createUserOutput = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };

    const loginOutput = await this.authenticate(user);

    return {
      createUserOutput,
      loginOutput,
    };
  }

  public async login(input: LoginInput): Promise<LoginOutput> {
    const user = await this.validateUser(input);
    return this.authenticate(user);
  }

  private async authenticate(user: User): Promise<LoginOutput> {
    const payload: AccessTokenPayload = {
      id: user.id,
      email: user.email,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async validateUser(input: LoginInput): Promise<User> {
    const { email, password } = input;
    const user = await this.usersService.findOneByEmail(email);
    return this.usersService
      .comparePassword(password, user)
      .then((res) => {
        if (!res) {
          throw new Error('Wrong password');
        }
        return user;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
