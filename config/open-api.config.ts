import OpenAI from "openai";
export const OpenAIConfig = (): OpenAI => {
  return new OpenAI({
    apiKey: process.env.NEX_PUBLIC_OPENAI_KEY,
  });
};
