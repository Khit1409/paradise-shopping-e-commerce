import OpenAI from 'openai';

export const OpenAIConfig = (): OpenAI => {
  return new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });
};
