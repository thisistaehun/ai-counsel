import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Configuration } from 'openai';
import { ChatGptResolver } from './chat-gpt.resolver';
import { ChatGptService } from './chat-gpt.service';

@Module({
  imports: [ConfigModule],
  providers: [ChatGptService, ChatGptResolver, Configuration],
})
export class ChatGptModule {}
