import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import * as path from 'path';
import { ChatGptModule } from './modules/chat-gpt/chat-gpt.module';
import { EnvConfigModule } from './modules/env-config/env-config.module';

@Module({
  imports: [
    EnvConfigModule,
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: path.join(process.cwd(), 'src/graphql/schema.gql'),
        driver: ApolloDriver,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      }),
    }),
    ChatGptModule,
  ],
})
export class AppModule {}
