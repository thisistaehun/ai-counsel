import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from 'src/modules/apis/users/entities/user.entity';
import { LoginOutput } from './login.dto';

@InputType()
export class SignUpInput extends PickType(User, ['email', 'nickname']) {
  @Field(() => String, {
    description: 'The Password of the User',
  })
  password: string;
}

@ObjectType()
export class SignUpOutput {
  @Field(() => User, {
    description: 'The User of the SignUp',
  })
  user: User;

  @Field(() => LoginOutput, {
    description: 'The LoginOutput of the SignUp',
  })
  loginOutput: LoginOutput;
}
