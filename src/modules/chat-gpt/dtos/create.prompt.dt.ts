import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePromptInput {
  @Field(() => String)
  age: string;
  @Field(() => String)
  education: string;
  @Field(() => String)
  nationality: string;
  @Field(() => String)
  mbti: string;
  @Field(() => String)
  hobby: string;
  @Field(() => String)
  interestedIn: string;
  @Field(() => String)
  question: string;
}
