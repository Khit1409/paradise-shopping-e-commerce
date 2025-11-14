import OpenAI from "openai";
export const OpenAIConfig = (): OpenAI => {
  return new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });
};
