import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/apis/users/entities/user.entity';
import { UsersService } from 'src/modules/apis/users/users.service';
import { EnvConfig } from 'src/modules/common/types/config';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const bearerToken: string = ExtractJwt.fromAuthHeaderAsBearerToken()(
          req,
        ) as string;
        const decoded = this.jwtService.decode(bearerToken);
        if (decoded && decoded['exp'] * 1000 < Date.now()) {
          throw new Error('토큰이 만료되었습니다.');
        }
        return bearerToken;
      },
      ignoreExpriraton: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      throw new Error('존재하지 않는 사용자입니다.');
    }
    return user;
  }
}
