import { generateText, streamText, tool } from "ai";
import { z } from "zod";
import { myProvider } from "@/lib/ai/providers";
import { getSimilarityMultiQuarter } from "@/lib/db/financial-report-embedding/queries";
import { openai } from "@ai-sdk/openai";
import { ResponseMessage } from "@/types/ai/message";

export const maxDuration = 30;

export async function POST(req: Request): Promise<Response> {
  console.log("Calling chat API with path /faq/api/chat/route.ts 💬 🌐");

  try {
    const { messages } = await req.json();
    const SYS_PROMPT_SERVICE = `You are a helpful customer service agent about the financial & banking performance, helping a user efficiently fulfill their request while adhering closely to provided guidelines.
  
  # Instructions
  - After receiving data from the user, analyze the data and identify which quarter of which year it belongs to (Q#/YY), and then always call a tool before answering factual questions.
    - However,if you don't have enough information to properly call the getWebSearchResults tool, ask the user for the information you need.
  - Do not discuss prohibited topics (politics, religion, controversial current events, medical, legal,  personal conversations, internal company operations, or criticism of any people or company).
  - Rely on sample phrases whenever appropriate, but never repeat a sample phrase in the same conversation. Feel free to vary the sample phrases to avoid sounding repetitive and make it more appropriate for the user.
  - Always follow the provided output format for new messages.
  - If you're going to call a tool, always message the user with an appropriate message before and after calling the tool.
  - Maintain a professional and concise tone in all responses, and use emojis between sentences.
  - If you've resolved the user's request, ask if there's anything else you can help with
  - Currency used for financial and banking performance data: THB (Thai Baht, ฿).
  - Response to the user with English language only.
  
  # Precise Response Steps (for each response)
  1. Call tool to fulfill the user's desired action.
   - If response from the tool is not sufficient to answer the user's question, call the getWebSearchResults tool again with more specific information.
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
  Can you tell me about Operating results for the first quarter of 2024 and the first quarter of 2025?
  
  ## Assistant Response 1
  ### Message
  "Hi, how can I help you? 😊🎉\n\nYou'd like to know about the operating results for the first quarter of 2024 and the first quarter of 2025 🤝 Let me check that for you—one moment, please. 🚀\n\n"
  
  ### Tool Calls
  getFinancialReportInfo(question="Can you tell me about the operating results", quartersInYears=["Q1/24", "Q1/25"]);
  
  // After tool call, the assistant would follow up with:
  
  ## Assistant Response 2 (after tool call)
  ### Message
  "Here's what I found: 📊 In the Operating results for the first quarter of 2026, our revenue rose by 8% YoY, reaching ฿2.1B, driven by strong growth in digital services and lower operating costs. 🚀 Need help diving deeper into any section? 😊"
  
  # Example 2
  ## User
  Tell me about the operating results and Interest income - net  for the second quarter of 2024?
  
  ## Assistant Response 1
  ### Message
  "Hi, how can I help you? 😊🎉\n\nYou'd like to know about the operating results and Interest income - net  for the second quarter of 2024? 🤝 Let me check that for you—one moment, please. 🚀\n\n"
  
  ### Tool Calls
  getFinancialReportInfo(question="Tell me about the operating results and Interest income - net  for the second quarter of 2024?, quartersInYears=["Q1/24"]);
  
  // After tool call, the assistant would follow up with:
  
  ## Assistant Response 2 (after tool call)
  ### Message
  "Here's a detailed overview of the operating results and net interest income for the second quarter of 2024: 📊\n\n
  1. Operating Results:
     - Net Profit: The net profit attributable to equity holders of the Bank was ฿12,653 million, a decrease of 6.18% from Q1/24 but an increase of 20.26% from Q2/23.
     - Basic Earnings per Share: The basic earnings per share was ฿5.34, down by 3.44% from Q1/24 but up by 20.51% from Q2/23.
     - Non-Interest Income: This was ฿12,961 million, showing an increase of 11.51% from Q1/24 and 6.58% from Q2/23.
     - Total Operating Income - Net: The total net operating income was ฿50,429 million, a slight increase of 0.55% from Q1/24 and 6.27% from Q2/23.
     - Total Other Operating Expenses: These were ฿21,888 million, an increase of 5.67% from Q1/24 and 4.82% from Q2/23.
     - Operating Profit Before Expected Credit Loss and Income Tax Expense: This was ฿28,541 million, a decrease of 3.05% from Q1/24 but an increase of 7.36% from Q2/23.
     - Expected Credit Loss: The expected credit loss was ฿11,672 million, a slight decrease of 0.10% from Q1/24 and a decrease of 8.32% from Q2/23.
  
  2. Interest Income - Net:
     - The net interest income for Q2/24 was ฿37,468 million, a decrease of 2.75% from Q1/24 but an increase of 6.18% from Q2/23.
  
  These figures reflect the bank's financial health and performance during the second quarter of 2024. If you have any more questions or need further assistance, feel free to ask! 😊"
  
  # Example 3
  ## User
  Can you tell me about Operating results for the first quarter of 2026?
  
  ## Assistant Response 1
  ### Message
  "Hi, how can I help you? 😊🎉\n\nYou'd like to know about the operating results for the first quarter of 2024 and the first quarter of 2025 🤝 Let me check that for you—one moment, please. 🚀\n\n"
  
  ### Tool Calls
  getFinancialReportInfo(question="Can you tell me about the operating results", quartersInYears=["Q1/26"]);
  
  // After tool call :
  ## If Not enough information to call the tool, so we call getWebSearchResults tool
  getWebSearchResults(query="Operating results for the first quarter of 2026");
  ## Else if we have enough information to call the tool
  
  // After tool call, the assistant would follow up with:
  
  ## Assistant Response 2 (after tool call)
  ### Message
  "Here's what I found: 📊 In the Operating results for the first quarter of 2026, our revenue rose by 8% YoY, reaching ฿2.1B, driven by strong growth in digital services and lower operating costs. 🚀 Need help diving deeper into any section? 😊"
  `;
    const controller = new AbortController();
    console.log("Before calling streamText API... ⚠️⛏️");

    const result = await streamText({
      model: myProvider.languageModel("chat-model"),
      messages,
      system: SYS_PROMPT_SERVICE,
      abortSignal: controller.signal,
      tools: {
        getFinancialReportInfo: tool({
          description: `Tool to get Economic Outlook & Banking Performance from your knowledge base to answer questions.`,
          parameters: z.object({
            question: z
              .string()
              .describe(
                "The user's natural language question about economic outlook or banking performance, e.g., 'Tell me about Operating results for the first quarter of 2025?'"
              ),
            quartersInYears: z
              .array(z.string())
              .describe(
                "List of quarter-year values in the format 'Q#/YY', e.g., ['Q1/25', 'Q2/25', 'Q1/26']."
              ),
          }),
          execute: async ({ question, quartersInYears }) => {
            console.log(`Fetching Financial Report Info 📈 🔍`);
            return await getSimilarityMultiQuarter({
              question,
              quartersInYears,
              controller,
            });
          },
        }),
        getWebSearchResults: openai.tools.webSearchPreview({
          searchContextSize: "high",
          userLocation: {
            type: "approximate",
            city: "Bangkok",
            region: "Thailand",
          },
        }),
      },
    });

    console.log("After calling streamText API... ⛏️🎊");
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error calling streamText API: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the request." }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request): Promise<Response> {
  console.log("Calling chat API with path /faq/api/chat/route.ts 🐙 💬 🌐 👀");

  try {
    const SYS_PROMPT_SERVICE = `You are a Analysis assistant that helps users efficiently fulfill their requests while adhering closely to the provided guidelines.
  
  # Instructions
  – After receiving data from the user, analyze the data and the playbook to determine the best next actions.
    - Next Action will consist only of 'Meeting Appointment', 'Draft Email', and 'Create Quotation/Invoice'.
  - Always respond in a JSON format with the key "nextActions" containing an array of actions.
  - Do not discuss prohibited topics (politics, religion, controversial current events, medical, legal,  personal conversations, internal company operations, or criticism of any people or company).
  - Response to the user with this JSON structure specific only.
    {
      "nextActions": [{{next_action}}],
    }
  
  # Precise Response Steps (for each response)
  1. In your response to the user
      a. Respond appropriately given the above guidelines.
  
  # Sample Phrases
  ## Deflecting a Prohibited Topic
  - "I'm sorry, but I'm unable to discuss that topic. Is there something else I can help you with?"
  - "That's not something I'm able to provide information on, but I'm happy to help with any other questions you may have."
  
  # Output Format
  - Always include your final response to the user.
  
  
  # Example 1
  ## User
  "# Context
  * Recipient: {{recipient_name}} ({{recipient_role}})  
  * Objective: {{objective}}  
  * Value proposition focus : {{value_proposition}}  
  * Call to action: {{call_to_action}}  
  * Tone: {{tone}}
  * Relevant context: {{context}}

  # Task
  Please write plain text email with subject line, and greeting, body.
  "
  
  ## Assistant Response 1
  ### Message
  {
    "nextActions": ["Meeting Appointment"],
  }
  `;
    console.log("Before calling streamText API... ⚠️⛏️");

    const data = {
      industry: "Healthcare",
      use_case: "Automating patient record management with AI",
      company_size: "500–1000 employees",
      geography: "Southeast Asia",
      pain_points: [
        "Manual data entry",
        "Fragmented patient data",
        "Compliance risks",
      ],
      desired_outcomes: [
        "Improved data accuracy",
        "Centralized records",
        "Better regulatory adherence",
      ],
    };
    let markdownInfo = `# Context
    Industry: {{industry}}  
    Use-case need: {{use_case}}  
    Company size: {{company_size}}  
    Region: {{geography}}  
    Key pains/outcomes sought: {{pain_points}}, {{desired_outcomes}}

    # Task
    Recommend the 3 best-fit case studies according to provided case profile`;

    Object.entries(data).forEach(([key, value]) => {
      if (!markdownInfo.includes(key)) {
        return;
      }
      markdownInfo = markdownInfo.replace(
        `{{${key}}}`,
        Array.isArray(value) ? value.join(", ") : value
      );
    });

    markdownInfo = `# Context
* Recipient: Sarah Tan (Head of Marketing)  
* Objective: Introduce AI-powered CRM enhancements  
* Value proposition focus : Improve customer engagement and reduce churn  
* Call to action: Schedule a 30-minute demo  
* Tone: Professional yet friendly  
* Relevant context: Sarah recently led a campaign focused on customer retention, showing her team's interest in tools that support deeper engagement.

# Task
Please write plain text email with subject line, and greeting, body.`;

    const messages: Array<ResponseMessage> = [
      {
        role: "user",
        content: `
          Please analyze this playbook to determine the best next action :
          ${markdownInfo}
          `,
      },
    ];

    const result = await generateText({
      maxSteps: 1,
      model: myProvider.languageModel("chat-model"),
      system: SYS_PROMPT_SERVICE,
      messages,
    });

    console.log("After calling streamText API... ⛏️🎊");
    let raw = result.text.trim();
    console.log("Raw 🐙 : ", raw);
    return Response.json(JSON.parse(raw), { status: 200 });
  } catch (error) {
    console.error("Error calling generateText API: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the request." }),
      { status: 500 }
    );
  }
}
