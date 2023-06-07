import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SelfEstimationInput {
  @Field(() => Int, {
    description: '의사소통능력',
  })
  communication: number;

  @Field(() => Int, {
    description: '리더십',
  })
  leadership: number;

  @Field(() => Int, {
    description: '문제해결능력',
  })
  problemSolving: number;

  @Field(() => Int, {
    description: '조직능력',
  })
  organization: number;

  @Field(() => Int, {
    description: '분석적 사고',
  })
  analyticalThinking: number;

  @Field(() => Int, {
    description: '창의성',
  })
  creativity: number;

  @Field(() => Int, {
    description: '적응력',
  })
  adaptability: number;

  @Field(() => Int, {
    description: '팀워크',
  })
  teamwork: number;

  @Field(() => Int, {
    description: '자기관리',
  })
  selfManagement: number;
}
