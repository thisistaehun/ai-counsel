import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ChatGptService } from './chat-gpt.service';
import { CreatePromptInput } from './dtos/create.prompt.dt';

@Resolver({})
export class ChatGptResolver {
  constructor(private readonly chatGptService: ChatGptService) {}

  @Mutation(() => String, {
    description: 'Chat with GPT-3',
  })
  async chatGpt(
    @Args('createPromptInput') createPromptInput: CreatePromptInput,
  ): Promise<string> {
    return this.chatGptService.chat(createPromptInput);
  }
}
