import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/modules/auth/guard/gql-auth.guard';
import { ChatGptService } from './chat-gpt.service';
import { PromptInput } from './dtos/prompt/prompt.dto';

@Resolver({})
export class ChatGptResolver {
  constructor(private readonly chatGptService: ChatGptService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, {
    description: 'Chat with GPT-3',
  })
  async chatGpt(
    @Args('promptInput') promptInput: PromptInput,
  ): Promise<string> {
    return this.chatGptService.chat(promptInput);
  }
}
