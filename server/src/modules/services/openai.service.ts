import { OpenAIConfig } from '@/config/open-ai/open-ai.config';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private readonly openAi: OpenAI;
  constructor() {
    this.openAi = OpenAIConfig();
  }

  async clearProductHashtag(
    name: string,
    description: string,
  ): Promise<string[]> {
    const prompt = `
      Tạo một mảng hashtag cho sản phẩm. dựa trên tên và mô tả của sản phẩm dưới đây.
      Tên: ${name};
      Mô tả: ${description};
      chỉ trả về duy nhất mảng ví dụ JSON[#hashtag1,#hastag2,...]. Không giải thích và trả lời gì thêm
      `;
    const res = await this.openAi.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });
    let text = res.choices[0].message.content?.trim() || '[]';

    // Xóa code block markdown nếu có
    text = text.replace(/```json|```/g, '').trim();

    let hashtags: string[];
    try {
      hashtags = JSON.parse(text) as string[];
    } catch {
      // fallback nếu GPT trả về không phải JSON thật
      hashtags = text.split(/\s+/).filter((t) => t.startsWith('#'));
    }
    return hashtags;
  }
}
