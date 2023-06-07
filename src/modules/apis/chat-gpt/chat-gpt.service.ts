import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from 'src/modules/common/types/config';
import { PromptInput } from './dtos/prompt/prompt.dto';

@Injectable()
export class ChatGptService {
  private _apiKey: string;
  constructor(private readonly configService: ConfigService<EnvConfig>) {
    this._apiKey = this.configService.get('OPENAI_API_KEY');
  }

  async chat(promptInput: PromptInput): Promise<string> {
    const prompt = await this.createPrompt(promptInput);
    const response = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    };

    try {
      const result = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this._apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      });
      console.log(result);

      const { choices } = await result.json();
      console.log(choices);
      const message = choices[0].message.content;
      console.log(message);

      return message;
    } catch (error) {
      console.error('Failed to ask question:', error);
      throw error;
    }
  }

  private async createPrompt(input: PromptInput) {
    const {
      selfIntroduction: {
        name,
        age,
        mbti,
        major,
        hobby,
        interestedIn,
        dislike,
      },
      selfEstimation: {
        communication,
        leadership,
        problemSolving,
        organization,
        analyticalThinking,
        creativity,
        adaptability,
        teamwork,
        selfManagement,
      },
      interestedJob: { interestedJob1, interestedJob2, interestedJob3 },
    } = input;

    const prompt = `
    ## Self Introduction

    ${name} ${age}살 ${mbti} 성격의 ${major} 전공자입니다.
    취미는 ${hobby}이고, ${interestedIn}에 관심이 많습니다.
    ${dislike}을(를) 싫어합니다.

    ## Self Estimation(Strengths)
    * 각 항목에 대해 1~5점 중 하나를 선택해주세요.(1: 매우 부족, 5: 매우 능숙)
    의사소통능력: ${communication}
    리더십: ${leadership}
    문제해결능력: ${problemSolving}
    조직능력: ${organization}
    분석적 사고: ${analyticalThinking}
    창의성: ${creativity}
    적응력: ${adaptability}
    팀워크: ${teamwork}
    자기관리: ${selfManagement}

    ## Interested Job

    1지망: ${interestedJob1}
    2지망: ${interestedJob2}
    3지망: ${interestedJob3}

    다음과 같은 정보를 가진 설문자에게 가장 적합한 직업을 한 가지 추천해주세요.
    설문자의 성격, 관심사와, 강점을 최대한 고려하여 답변에 반영하며, 직접 언급해주세요.
    강점에서 높게 나타난 파트와, 낮게 나타난 파트를 비교하여 설문자의 성향을 파악해주세요.
    또한 마지막으로 해당 직업을 갖기 위해 필요한 노력에 대해서도 설명해주세요. 

    100자 이내로 답해주세요. 

    `;

    return prompt;
  }
}
