import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfig } from '../common/types/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const configService = new ConfigService<EnvConfig>();
        console.log(configService.get('DATABASE_HOST'));
        return {
          type: 'mysql',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
