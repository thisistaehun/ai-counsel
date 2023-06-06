import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, {
    description: 'The Email of the User',
  })
  email: string;

  @Field(() => String, {
    description: 'The Password of the User',
  })
  password: string;
}

@ObjectType()
export class LoginOutput {
  @Field(() => String, {
    description: 'The Token of the User',
  })
  accessToken: string;
}
