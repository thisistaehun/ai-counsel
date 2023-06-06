import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SelfIntroductionInput {
  @Field(() => String, {
    description: '이름',
  })
  name: string;

  @Field(() => Int, {
    description: '나이',
  })
  age: number;

  @Field(() => String, {
    description: 'MBTI',
  })
  mbti: string;

  @Field(() => String, {
    description: '전공',
  })
  major: string;

  @Field(() => String, {
    description: '취미',
  })
  hobby: string;

  @Field(() => String, {
    description: '관심사',
  })
  interestedIn: string;

  @Field(() => String, {
    description: '싫어하는 것',
  })
  dislike: string;
}
