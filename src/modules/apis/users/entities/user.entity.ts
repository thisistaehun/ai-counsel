import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validate';
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

  @Column({ type: 'varchar', length: 30 })
  @Field(() => String, {
    description: 'The Email of the User',
  })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String, {
    description: 'The Password of the User',
  })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 30 })
  @Field(() => String, {
    description: 'The Nickname of the User',
  })
  nickname: string;
}
