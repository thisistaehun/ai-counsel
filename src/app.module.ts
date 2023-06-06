import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import * as path from 'path';
import { ApiModule } from './modules/apis/api.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`config/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: path.join(process.cwd(), 'src/graphql/schema.gql'),
        driver: ApolloDriver,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      }),
    }),
    ApiModule,
    DatabaseModule,
  ],
})
export class AppModule {}
