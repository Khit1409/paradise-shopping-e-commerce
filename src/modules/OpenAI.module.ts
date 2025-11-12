import { Module } from '@nestjs/common';
import { OpenAIService } from './services/openai.service';

@Module({
  imports: [],
  controllers: [],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
