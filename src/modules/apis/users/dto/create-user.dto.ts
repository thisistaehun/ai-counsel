import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'nickname',
]) {}

@ObjectType()
export class CreateUserOutput extends PickType(User, [
  'id',
  'email',
  'nickname',
]) {}
