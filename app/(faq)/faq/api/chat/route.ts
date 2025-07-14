import { activities } from "./../../../../../utils/mockdata";
import {
  extractReasoningMiddleware,
  generateObject,
  generateText,
  streamText,
  tool,
  wrapLanguageModel,
} from "ai";
import { z } from "zod";
import { myProvider } from "@/lib/ai/providers";
import { getSimilarityMultiQuarter } from "@/lib/db/financial-report-embedding/queries";
import { openai } from "@ai-sdk/openai";
import { ResponseMessage } from "@/types/ai/message";
import { NextResponse } from "next/server";
import {
  Company,
  Lead,
  Rep,
  nextActionResponse as NextActionResponse,
  Activity,
} from "@/types/common";
import { azure } from "@ai-sdk/azure";
import {
  sarahActivities,
  sarahCompany,
  sarahLead,
  sarahOwner,
} from "@/utils/personal-mockup-data";

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
    console.log("Before calling streamText API... ⚠️⛏️");

    // Data - Sale Stage
    const leadInfo = sarahLead;
    const companyInfo = sarahCompany;
    const ownerInfo = sarahOwner;
    const activitiesInfo = sarahActivities;

    // Call analyzeNextAction function
    const result = await analyzeNextActionV2(
      leadInfo,
      companyInfo,
      ownerInfo,
      activitiesInfo
    );

    console.log("Analyzed Result 📝 : ", result);

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("Error calling generateText API: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the request." }),
      { status: 500 }
    );
  }
}

// Evaluation of the next action based on the playbook and sale stage data
/* export async function GET(req: Request): Promise<Response> {
  console.log("Calling chat API with path /faq/api/chat/route.ts 🐙 💬 🌐 👀");

  try {
    console.log("Before calling streamText API... ⚠️⛏️");

    // Data - Sale Stage
    const saleStage = await getSaleStage();
    // Data - Playbook Template
    let markdownInfo = await getPlaybookTemplate();

    // Modify Playbook Template with Data
    markdownInfo = await modifyPlaybookValue(saleStage, markdownInfo);

    // Call analyzeNextAction function
    const result = await analyzeNextAction(markdownInfo);
    console.log("Analyzed Result 📝 : ", result);

    const bestPractice = await getBestPractice();
    const evaluatedPractice = await evaluatePractice(
      saleStage,
      result,
      bestPractice.saleStageBestPractices
    );
    console.log("Evaluated Practice 🧠 : ", evaluatedPractice);

    return Response.json(null, { status: 200 });
  } catch (error) {
    console.error("Error calling generateText API: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the request." }),
      { status: 500 }
    );
  }
} */

export async function PUT(request: Request) {
  try {
    const result = await generateText({
      model: myProvider.languageModel("chat-model-reasoning"),
      messages: [{ role: "user", content: "What is 25 x 4?" }],
    });
    console.log("Generated reasoning and final answer: ", result);

    return NextResponse.json(
      {
        message: "Reasoning and final answer generated successfully!",
        text: result.text,
        reasoning: result.reasoning,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log("Error 💥 : ", e);
    return new Response("An error occurred while processing your request!", {
      status: 500,
    });
  }
}

async function getSaleStage(): Promise<any> {
  /* const data = {
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
  }; */
  const data = {
    recipient_name: "Sarah Tan",
    recipient_role: "Head of Marketing",
    objective: "Introduce AI-powered CRM enhancements",
    value_proposition: "Improve customer engagement and reduce churn",
    call_to_action: "Schedule a 30-minute demo",
    tone: "Professional yet friendly",
    context:
      "Sarah recently led a campaign focused on customer retention, showing her team's interest in tools that support deeper engagement.",
  };

  return data;
}

async function getPlaybookTemplate(): Promise<any> {
  /* const playbookTemplate = `# Context
    Industry: {{industry}}  
    Use-case need: {{use_case}}  
    Company size: {{company_size}}  
    Region: {{geography}}  
    Key pains/outcomes sought: {{pain_points}}, {{desired_outcomes}}

    # Task
    Recommend the 3 best-fit case studies according to provided case profile`; */
  const playbookTemplate = `# Context
  * Recipient: {{recipient_name}} ({{recipient_role}})  
  * Objective: {{objective}}  
  * Value proposition focus : {{value_proposition}}  
  * Call to action: {{call_to_action}}  
  * Tone: {{tone}}
  * Relevant context: {{context}}

  # Task
  Please write plain text email with subject line, and greeting, body.`;
  return playbookTemplate;
}
async function modifyPlaybookValue(data: any, playbook: string) {
  Object.entries(data).forEach(([key, value]) => {
    if (!playbook.includes(key)) {
      return;
    }
    playbook = playbook?.replace(
      `{{${key}}}`,
      Array.isArray(value) ? value.join(", ") : String(value)
    );
  });
  console.log("Modified Playbook Template 📝 : ", playbook);

  return playbook;
}

async function analyzeNextAction(
  playbook: string
): Promise<NextActionResponse> {
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
  * Recipient: Sarah Tan (Head of Marketing)  
  * Objective: Introduce AI-powered CRM enhancements  
  * Value proposition focus : Improve customer engagement and reduce churn  
  * Call to action: Schedule a 30-minute demo  
  * Tone: Professional yet friendly  
  * Relevant context: Sarah recently led a campaign focused on customer retention, showing her team's interest in tools that support deeper engagement.

  # Task
  Please write plain text email with subject line, and greeting, body.
  "
  
  ## Assistant Response 1
  ### Message
  {
    "nextActions": ["Draft Email"],
  }
  `;

  const messages: Array<ResponseMessage> = [
    {
      role: "user",
      content: `
          Please analyze this playbook to determine the best next action :
          ${playbook}
          `,
    },
  ];

  const { text, response } = await generateText({
    maxSteps: 1,
    model: myProvider.languageModel("chat-model"),
    system: SYS_PROMPT_SERVICE,
    messages,
  });

  console.log("Analyzed Result 📝 : ", response.modelId);

  return JSON.parse(text.trim()) as NextActionResponse;
}

async function getBestPractice() {
  return {
    saleStageBestPractices: [
      {
        stage: "Initial Contact",
        nextAction: "Meeting Appointment",
        bestPractices: [
          "Prepare a personalized meeting agenda based on the prospect's industry and challenges.",
          "Suggest 2–3 available time slots to make scheduling easier.",
          "Use a calendar link (e.g., Calendly) for hassle-free booking.",
          "Keep the invitation concise, and highlight the value the prospect will gain from the meeting.",
        ],
      },
      {
        stage: "Need Analysis",
        nextAction: "Draft Email",
        bestPractices: [
          "Summarize the client’s pain points and goals from the previous call or discovery session.",
          "Clearly outline how your solution addresses each point.",
          "Use bullet points or short sections for readability.",
          "Include a strong call-to-action (e.g., book a follow-up, reply with feedback).",
        ],
      },
      {
        stage: "Proposal/Quotation",
        nextAction: "Create Quotation/Invoice",
        bestPractices: [
          "Ensure all requirements discussed are reflected clearly in the quotation.",
          "Break down pricing by item or service for transparency.",
          "Mention terms (payment, validity, lead time) clearly.",
          "Use professional templates and double-check contact details and amounts before sending.",
        ],
      },
      {
        stage: "Follow-up",
        nextAction: "Draft Email",
        bestPractices: [
          "Be polite but clear in reminding about the pending proposal or meeting.",
          "Include value-driven reminders, e.g., what they gain if they proceed.",
          "Keep it short and easy to respond to.",
          "Provide alternative contact options (e.g., phone, LINE) for flexibility.",
        ],
      },
      {
        stage: "Negotiation",
        nextAction: "Meeting Appointment",
        bestPractices: [
          "Schedule a meeting with key decision-makers if possible.",
          "Prepare to discuss value and ROI rather than just discounting.",
          "Bring case studies or references to reinforce confidence.",
          "Leave room for mutual agreement – listen actively to client concerns.",
        ],
      },
    ],
  };
}

async function evaluatePractice(
  saleStage: any,
  action: NextActionResponse,
  bestPractice: any[]
) {
  console.log("-- Sale Stage Data -- : ", saleStage);
  console.log("-- Action Data -- : ", action);
  console.log("-- Best Practice Data -- : ", bestPractice);

  let currentNextActionStep = "";
  let iterations = 1;
  const MAX_ITERATIONS = 3;

  // Initial translation
  currentNextActionStep = Array.isArray(action.nextActions)
    ? action.nextActions.join(", ")
    : action.nextActions ?? "";

  console.log("Received Next Action Step ✉️ : ", currentNextActionStep);

  // Evaluation-optimization loop
  while (iterations <= MAX_ITERATIONS) {
    console.log("------------------------------");
    console.log("Iteration number 🔄 : ", iterations);
    console.log("Best Practice Data 📚 : ", currentNextActionStep);
    console.log("------------------------------");

    // Evaluate current translation
    const { object: evaluation } = await generateObject({
      model: myProvider.languageModel("chat-model"),
      schema: z.object({
        qualityScore: z.number().min(1).max(10),
        practicality: z.boolean(),
        worthiness: z.boolean(),

        specificIssues: z.array(z.string()),
        improvementSuggestions: z.array(z.string()),
      }),
      system: `You are an expert in evaluating the next sales stage action and adhering closely to the provided guidelines

      # Instructions
      - Next Action will consist only of 'Meeting Appointment', 'Draft Email', and 'Create Quotation/Invoice'.
      `,
      prompt: `Evaluate this data:

      SaleStage: ${JSON.stringify(saleStage)}
      NextAction: ${currentNextActionStep}
      BestPractice: ${JSON.stringify(bestPractice)}

      Consider:
      1. Practicality
      2. Worthiness`,
    });

    // Check if quality meets threshold
    console.log("Evaluation result 🌐 : ", JSON.stringify(evaluation, null, 2));

    if (
      evaluation.qualityScore >= 8 &&
      evaluation.practicality &&
      evaluation.worthiness
    ) {
      break;
    }

    // Generate improved translation based on feedback
    const { text: improvedNextActionStep, response } = await generateText({
      model: myProvider.languageModel("evaluate-model"), // use a larger model
      system: `You are an expert in evaluating the next sales stage action and adhering closely to the provided guidelines

      # Instructions
      - Next Action will consist only of 'Meeting Appointment', 'Draft Email', and 'Create Quotation/Invoice'.
      `,
      prompt: `Improve this the next sales stage action based on the following feedback:
      ${evaluation.specificIssues.join("\n")}
      ${evaluation.improvementSuggestions.join("\n")}

      NextAction: ${currentNextActionStep}
      BestPractice: ${JSON.stringify(bestPractice)}`,
    });

    console.log("improvedTranslation result 🧠 : ", response.modelId);

    currentNextActionStep = improvedNextActionStep;
    iterations++;
  }

  return {
    finalTranslation: currentNextActionStep,
    iterationsRequired: iterations,
  };
}

async function analyzeNextActionV2(
  leadInfo: Lead,
  companyInfo: Company,
  ownerInfo: Rep,
  activitiesInfo: Activity[]
): Promise<NextActionResponse> {
  const SYS_PROMPT_SERVICE = `You are a Senior Sales Assistant who efficiently analyzes action plans in their sales stage, while closely adhering to the provided guidelines.
  
  # Instructions
  – After receiving data from the user, analyze the sales stage data to determine the action plans.
  - The action plans will be multiple objects.
  - Always respond in a JSON format.
    - The values in next actions and sub-actions should be short phrases, such as 'Meeting Appointment', etc.
    - The values in sub-actions should be minimum 1 and maximum 3 sub-actions.
    - Each subAction corresponds to a specific nextAction.
    - Each sub-action should have the following keys: action, type, channel, description.
    - The action of sub-action should be a short phrase that define to sub-action.
    - The type of sub-action should be one of the following: 'Task', 'Email', 'Call', 'Meeting', 'Social'.
    - The channel of sub-action should be one of the following: 'Phone', 'Email', 'Video', 'LinkedIn', 'On-site', 'Internal', 'Research', 'CRM Note', 'Follow-up', 'Proposal', 'Recap', 'Outreach', 'Nurture', 'Intro'.
    - The description of sub-action should be a short phrase that describes the action, such as 'Schedule a meeting with the prospect to discuss their needs and how our solution can help them.', etc.
  - Response to the user with this JSON structure specific only.
    [
      {
        "nextAction": {{next_action}},
        "subActions": [{
          "action": {{sub_action_name}},
          "type": {{sub_action_type}},
          "channel": {{sub_action_channel}},
          "description": {{sub_action_description}}
        }],
      }
    ]
  - Do not discuss prohibited topics (politics, religion, controversial current events, medical, legal,  personal conversations, internal company operations, or criticism of any people or company).
  
  # Precise Response Steps (for each response)
  1. In your response to the user
      a. Respond appropriately given the above guidelines.
  
  # Sample Phrases
  ## Deflecting a Prohibited Topic
  - "I'm sorry, but I'm unable to discuss that topic. Is there something else I can help you with?"
  - "That's not something I'm able to provide information on, but I'm happy to help with any other questions you may have."
  
  # Output Format
  - Always include your final response to the user.
  `;

  const messages: Array<ResponseMessage> = [
    {
      role: "user",
      content: `
        Please analyze the sales stage data to determine the next actions and sub-actions :
        # Lead Information : ${JSON.stringify(leadInfo)}
        # Company Information : ${JSON.stringify(companyInfo)}
        # Owner Information : ${JSON.stringify(ownerInfo)}
        # Activities Information : ${JSON.stringify(activitiesInfo)}
      `,
    },
  ];

  const { text, response } = await generateText({
    maxSteps: 1,
    model: myProvider.languageModel("chat-model"),
    system: SYS_PROMPT_SERVICE,
    messages,
  });

  return JSON.parse(text.trim()) as NextActionResponse;
}
