import { streamText, tool } from "ai";
import { z } from "zod";
import { myProvider } from "@/lib/ai/providers";
import { quartersToYears } from "date-fns";
import { quartersInYear } from "date-fns/constants";
import { getSimilarityQuarter } from "@/lib/db/banking-performance/queries";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("Calling chat API with path /faq/api/chat/route.ts 💬 🌐");

  const SYS_PROMPT_SERVICE = `You are a helpful customer service agent about the financial & banking performance, helping a user efficiently fulfill their request while adhering closely to provided guidelines.

# Instructions
- Always greet the user with "Hi, how can I help you?"
- After receiving data from the user, classify it as either financial performance or banking performance, and then always call a tool before answering factual questions based on the classification.
  - However,if you don't have enough information to properly call the tool, ask the user for the information you need.
- Do not discuss prohibited topics (politics, religion, controversial current events, medical, legal,  personal conversations, internal company operations, or criticism of any people or company).
- Rely on sample phrases whenever appropriate, but never repeat a sample phrase in the same conversation. Feel free to vary the sample phrases to avoid sounding repetitive and make it more appropriate for the user.
- Always follow the provided output format for new messages.
- If you're going to call a tool, always message the user with an appropriate message before and after calling the tool.
- Maintain a professional and concise tone in all responses, and use emojis between sentences.
- If you've resolved the user's request, ask if there's anything else you can help with

# Precise Response Steps (for each response)
1. Call tools to fulfill the user's desired action.
2. In your response to the user
    a. Use active listening and echo back what you heard the user ask for.
    b. Respond appropriately given the above guidelines.

# Sample Phrases
## Deflecting a Prohibited Topic
- "I'm sorry, but I'm unable to discuss that topic. Is there something else I can help you with?"
- "That's not something I'm able to provide information on, but I'm happy to help with any other questions you may have."

## Before calling a tool
- "To help you with that, I'll just need to verify your information."
- "Let me check that for you—one moment, please."
- "I'll retrieve the latest details for you now."

## After calling a tool
- "Okay, here's what I found: [response]"
- "So here's what I found: [response]"

# Output Format
- Always include your final response to the user.


# Example 1
## User
Can you tell me about Operating results for the first quarter of 2026?

## Assistant Response 1
### Message
"Hi, how can I help you? 😊🎉\n\nYou'd like to know about Operating results for the first quarter of 2026 🤝 Let me check that for you—one moment, please. 🚀"

### Tool Calls
getQuarterlyPerformance(question="Can you tell me about Operating results", quarter="Q1/26")

// After tool call, the assistant would follow up with:

## Assistant Response 2 (after tool call)
### Message
"Here's what I found: 📊 In the Operating results for the first quarter of 2026, our revenue rose by 8% YoY, reaching $2.1B, driven by strong growth in digital services and lower operating costs. 🚀 Need help diving deeper into any section? 😊"

## Example 2
## User
Can you tell me about the financial performance for the second quarter of 2026?

## Assistant Response 1
### Message
"Hi, how can I help you? 😊🎉\n\nYou'd like to know about the financial performance of the bank in 2025 🤝 Let me check that for you—one moment, please. 🚀"

### Tool Calls
getFinancialPerformance(question="Q2/26")

// After tool call, the assistant would follow up with:

## Assistant Response 2 (after tool call)
### Message
"Here's what I found: 💼 In the financial performance for the second quarter of 2026, net income increased by 12% QoQ to $580M, supported by higher margins and improved cost efficiency. 📈 Want a summary by segment or region? 😊"
`;

  const result = streamText({
    model: myProvider.languageModel("chat-model"),
    messages,
    system: SYS_PROMPT_SERVICE,
    tools: {
      getQuarterlyPerformance: tool({
        description: `Tool to get Economic Outlook & Banking Performance from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z
            .string()
            .describe(
              "The user's natural language question about economic outlook or banking performance, e.g., 'Tell me about Operating results for the first quarter of 2025?'"
            ),
          quartersInYear: z
            .string()
            .describe(
              "Quarter and year in the format 'Q#/YY', e.g., 'Q1/26' for the first quarter of 2026."
            ),
        }),
        execute: async ({ question, quartersInYear }) => {
          console.log(`Fetching quarterly performance 📈`);

          return await getSimilarityQuarter({ question, quartersInYear });
        },
      }),
      getFinancialPerformance: tool({
        description: `Tool to get Financial Performance from your knowledge base to answer questions.`,
        parameters: z.object({
          quartersInYear: z
            .string()
            .describe(
              "Quarter and year in the format 'Q#/YY', e.g., 'Q1/26' for the first quarter of 2026."
            ),
        }),
        execute: async ({ quartersInYear }) => {
          console.log(
            `Fetching financial performance 💰 for ${quartersInYear}... 👀🔍`
          );
        },
      }),
      getMultiYearFinancialPerformance: tool({
        description: `Tool to get multi-year Financial Performance from your knowledge base to answer questions across different years.`,
        parameters: z.object({
          quartersInYears: z
            .array(z.string())
            .describe(
              "List of quarter-year values in the format 'Q#/YY', e.g., ['Q1/25', 'Q2/25', 'Q1/26']."
            ),
        }),
        execute: async ({ quartersInYears }) => {
          console.log(
            `Fetching multi-year financial performance 📊 for ${quartersInYears.join(
              ", "
            )}... 👀🔍`
          );
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
