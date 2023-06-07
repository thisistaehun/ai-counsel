import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from 'src/modules/apis/users/entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email']) {
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
