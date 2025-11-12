import { OpenAIConfig } from "@/config/open-api.config";

const openAiClient = OpenAIConfig();

export async function createProductDescriptionHtmlElement(
  description: string
): Promise<string> {
  const prompt = `
    Tạo 1 mô tả sản phẩm HTML (Không có thể <html></html>, <body></body>,<head></head>,<footer></footer>,<main></main>) theo đoạn văn ngắn sau.
    mô tả: ${description}.
    Chỉ trả về HTML không giải thích và mô tả gì thêm.
    `;
  const res = await openAiClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });
  const text = res.choices[0].message.content ?? "";
  return text;
}
