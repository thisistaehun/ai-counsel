import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  @Field(() => String, {
    description: 'The Email of the User',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  password: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  @Field(() => String, {
    description: 'The Nickname of the User',
  })
  @IsNotEmpty()
  nickname: string;
}
