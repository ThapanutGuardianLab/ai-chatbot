import { streamText, tool } from "ai";
import { z } from "zod";
import { myProvider } from "@/lib/ai/providers";
// import { findRelevantContent } from "@/lib/db/queries";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("Calling chat API with path /faq/api/chat/route.ts ❤️");

  const result = streamText({
    model: myProvider.languageModel("chat-model"),
    messages,
    system: `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
    tools: {
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question"),
        }),
        /* execute: async ({ question }) =>
          findRelevantContent({
            userQuery: question,
            similarity: 0.5,
          }), */
      }),
    },
  });

  return result.toDataStreamResponse();
}
