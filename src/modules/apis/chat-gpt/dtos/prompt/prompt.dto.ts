import { Field, InputType } from '@nestjs/graphql';
import { InterestedJobInput } from './interestedJob.dto';
import { SelfEstimationInput } from './self-estimation.dto';
import { SelfIntroductionInput } from './self-introduction.dto';

@InputType()
export class PromptInput {
  @Field(() => SelfIntroductionInput, {
    description: '자기소개',
  })
  selfIntroduction: SelfIntroductionInput;

  @Field(() => SelfEstimationInput, {
    description: '자기평가',
  })
  selfEstimation: SelfEstimationInput;

  @Field(() => InterestedJobInput, {
    description: '관심 직업',
  })
  interestedJob: InterestedJobInput;
}
