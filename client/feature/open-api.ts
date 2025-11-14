import { OpenAIConfig } from "@/config/open-api.config";
import * as cheerio from "cheerio";

const openAiClient = OpenAIConfig();

export async function createProductDescriptionHtmlElement(
  data: string
): Promise<string> {
  const prompt = `
    Tin nhắn: Tạo 1 mô tả sản phẩm bằng HTML, sử dụng taiwind css làm giao diện. Nội dung dựa tên các thuộc tính trong json của sản phẩm đã được json pare thành string.
    json:${data}.
    Công nghệ đang sử dung: NextJS.
    Yêu cầu bắt buộc: 
      - Nếu có hình ảnh thì sử dụng Image của next/image kích thước của ảnh 100x100 (px). 
      - Các phần của mô tả phải được flex-col.
      - Ưu tiện sử dụng <table> cho các phân loại sản phẩm trong varitants.
      - Ưu tiên bọc các thẻ <p> cho chữ
    Chỉ trả về HTML không giải thích và mô tả gì thêm. Xin cảm ơn.
  `;
  const res = await openAiClient.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = res.choices?.[0]?.message?.content ?? "";

  // Xoá các khối code fence ```html``` hoặc ``` nếu có
  const cleaned = rawText.replace(/```(?:html)?\n?|```/gi, "").trim();

  // Dùng cheerio để parse và lấy innerHTML của thẻ div ngoài cùng
  try {
    const $ = cheerio.load(cleaned);
    const firstDiv = $("div").first();
    if (firstDiv.length) {
      const inner = firstDiv.html() ?? "";
      console.log("Kết quả trả về (inner):", inner.trim());
      return inner.trim();
    } else {
      // Nếu không tìm thấy <div>, trả về nguyên văn đã clean
      console.log("Kết quả trả về (clean):", cleaned);
      return cleaned;
    }
  } catch (err) {
    // Nếu parse lỗi, fallback trả về cleaned text
    console.warn("Cheerio parse error, returning cleaned text", err);
    return cleaned;
  }
}
