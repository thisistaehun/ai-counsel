import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../apis/users/users.module';
import { EnvConfig } from '../common/types/config';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const configService = new ConfigService<EnvConfig>();
        return {
          secret: configService.get('JWT_SECRET'),
        };
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
