import { generateObject } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { z } from "zod";
import { NextResponse } from "next/server";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST() {
  try {
    const { object } = await generateObject({
      model: groq("deepseek-r1-distill-llama-70b"),
      schema: z.object({
        Wish: z.array(z.string()).length(4),
      }),
      // You are a gentle man, help me generate a wish for my beautiful friend in Women's Day.
      prompt: `
          Bạn là một người đàn ông tinh tế, hãy giúp tôi tạo ra 4 lời chúc đặc biệt dành tặng các bạn nữ xinh đẹp trong lớp nhân ngày Phụ nữ Việt Nam.

          🎉 **Yêu cầu cụ thể**:
          1️⃣ **Mỗi lời chúc cần liên quan đến một lĩnh vực khác nhau**, cụ thể:
            - 🖥 **Công nghệ (IT)**  
            - 🎨 **Nghệ thuật (Art)**  
            - 🏆 **Thể thao (Sports)**  
            - 📚 **Tri thức & giáo dục (Education)**  

          2️⃣ Mỗi câu chúc nên mở đầu bằng một câu nói nổi tiếng từ những người có tầm ảnh hưởng trong từng lĩnh vực.  
          3️⃣ Hãy sử dụng phong cách trang trọng nhưng vẫn thân thiện, gần gũi và truyền cảm hứng.  
          4️⃣ Mỗi câu chúc kèm theo một biểu tượng cảm xúc (emoji) phù hợp.  

          📌 **Ví dụ mong muốn**:  
          - 🖥 **Công nghệ**: _"The computer was born to solve problems that did not exist before." - Bill Gates. Chúc các bạn nữ luôn mạnh mẽ, sáng tạo như một dòng code không bao giờ lỗi! 💖_  
          - 🎨 **Nghệ thuật**: _"Every artist was first an amateur." - Ralph Waldo Emerson. Chúc các bạn nữ luôn tự do sáng tạo, tỏa sáng như những bức tranh rực rỡ sắc màu! 🎨_  
          - 🏆 **Thể thao**: _"Hard days are the best because that’s when champions are made." - Gabby Douglas. Mong rằng các bạn nữ luôn mạnh mẽ, kiên cường và đạt được mọi mục tiêu trong cuộc sống! 🏅_  
          - 📚 **Tri thức & giáo dục**: _"The beautiful thing about learning is that no one can take it away from you." - B.B. King. Chúc các bạn nữ không ngừng học hỏi, khám phá những chân trời mới! 📖_  

          ⚠️ **Lưu ý**: Hãy giữ lời chúc ngắn gọn, truyền cảm hứng và thể hiện sự trân trọng.  

        `,
    });
    return NextResponse.json(object);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
