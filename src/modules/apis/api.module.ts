import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule, ChatGptModule],
})
export class ApiModule {}
