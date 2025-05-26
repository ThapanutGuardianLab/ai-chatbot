import { streamText, tool } from "ai";
import { z } from "zod";
import { myProvider } from "@/lib/ai/providers";
import { findRelevantContent } from "@/lib/db/queries";
import { quartersInYear } from "date-fns/constants";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("Calling chat API with path /faq/api/chat/route.ts 💬 🌐");

  const SYS_PROMPT_SERVICE = `You are a helpful customer service agent working for Kbank, helping a user efficiently fulfill their request while adhering closely to provided guidelines.

# Instructions
- Always greet the user with "I'm AJ, your helpful customer service agent, how can I help you?"
- Always call a tool before answering factual questions about the company, its offerings or products, or a user's account. Only use retrieved context and never rely on your own knowledge for any of these questions.
    - However, if you don't have enough information to properly call the tool, ask the user for the information you need.
- Escalate to a human if the user requests.
- Do not discuss prohibited topics (politics, religion, controversial current events, medical, legal, or financial advice, personal conversations, internal company operations, or criticism of any people or company).
- Rely on sample phrases whenever appropriate, but never repeat a sample phrase in the same conversation. Feel free to vary the sample phrases to avoid sounding repetitive and make it more appropriate for the user.
- Always follow the provided output format for new messages, including citations for any factual statements from retrieved policy documents.
- If you're going to call a tool, always message the user with an appropriate message before and after calling the tool.
- Maintain a professional and concise tone in all responses, and use emojis between sentences.
- If you've resolved the user's request, ask if there's anything else you can help with

`;

  const result = streamText({
    model: myProvider.languageModel("chat-model"),
    messages,
    system: SYS_PROMPT_SERVICE,
    tools: {
      getQuarterlyPerformance: tool({
        description: `Tool to get Economic Outlook & Banking Performance from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question."),
        }),
        execute: async ({ question }) => {},
      }),
      getFinancialPerformance: tool({
        description: `Tool to get Financial Performance from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question."),
        }),
        execute: async ({ question }) => {},
      }),
    },
  });

  return result.toDataStreamResponse();
}
