import { Field, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class SelfEstimationInput {
  @Field(() => level, {
    description: '의사소통능력',
  })
  Communication: level;

  @Field(() => level, {
    description: '리더십',
  })
  Leadership: level;

  @Field(() => level, {
    description: '문제해결능력',
  })
  ProblemSolving: level;

  @Field(() => level, {
    description: '조직능력',
  })
  Organization: level;

  @Field(() => level, {
    description: '분석적 사고',
  })
  AnalyticalThinking: level;

  @Field(() => level, {
    description: '창의성',
  })
  Creativity: level;

  @Field(() => level, {
    description: '적응력',
  })
  Adaptability: level;

  @Field(() => level, {
    description: '팀워크',
  })
  Teamwork: level;

  @Field(() => level, {
    description: '자기관리',
  })
  SelfManagement: level;
}

export enum level {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

registerEnumType(level, {
  name: 'level',
  description: 'level',
});
