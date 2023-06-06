import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CreateUserOutput } from 'src/modules/apis/users/dto/create-user.dto';
import { User } from 'src/modules/apis/users/entities/user.entity';
import { LoginOutput } from './login.dto';

@InputType()
export class SignUpInput extends PickType(User, [
  'email',
  'password',
  'nickname',
]) {}

@ObjectType()
export class SignUpOutput {
  @Field(() => CreateUserOutput, {
    description: 'The CreateUserOutput of the SignUp',
  })
  createUserOutput: CreateUserOutput;

  @Field(() => LoginOutput, {
    description: 'The LoginOutput of the SignUp',
  })
  loginOutput: LoginOutput;
}
