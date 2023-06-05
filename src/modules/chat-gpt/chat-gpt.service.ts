import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { CreatePromptInput } from './dtos/create.prompt.dt';

@Injectable()
export class ChatGptService {
  private configuration: Configuration;
  private openai: OpenAIApi;
  constructor(private readonly configService: ConfigService) {
    this.configuration = new Configuration({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });

    this.openai = new OpenAIApi(this.configuration);
  }

  async chat(createPromptInput: CreatePromptInput): Promise<string> {
    const prompt = await this.createPrompt(createPromptInput);
    const response = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    };

    try {
      const result = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.configService.get<string>(
            'OPENAI_API_KEY',
          )}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      });

      const { choices } = await result.json();
      const message = choices[0].message.content;
      console.log(message);

      return message;
    } catch (error) {
      console.error('Failed to ask question:', error);
      throw error;
    }
  }

  private async createPrompt(createPromptInput: CreatePromptInput) {
    const { age, education, nationality, mbti, hobby, interestedIn, question } =
      createPromptInput;
    return `
    학력: ${education}
    나이: ${age}
    국적: ${nationality}
    성격(MBTI): ${mbti}
    관심사: ${hobby}
    취향: ${interestedIn}
    궁금한 것?: ${question}
    
    위 정보를 바탕으로 궁금한 것에 대한 답변을 150자 이내로 작성해주세요.
    `;
  }
}