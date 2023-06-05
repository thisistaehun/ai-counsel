import { ApolloDriver } from '@nestjs/apollo';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import * as path from 'path';

@Module({})
export class DynamicGraphQLModule {
  static forRoot(): DynamicModule {
    return {
      module: DynamicGraphQLModule,
      imports: [
        GraphQLModule.forRootAsync({
          driver: ApolloDriver,
          useFactory: async () => ({
            autoSchemaFile: path.join(process.cwd(), 'src/graphql/schema.gql'),
            driver: ApolloDriver,
            playground: false,
            plugins: [
              ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ],
          }),
        }),
      ],
      providers: [Logger],
    };
  }
}
