import { NextResponse } from "next/server";
import { auth } from "@/app/(auth)/auth";
import { extractTextFromBlob } from "@/utils/parseFile";
import { z } from "zod";
import { insertDocumentWithEmbeddings } from "@/lib/db/banking-performance/queries";
import { CoreMessage, streamText, tool } from "ai";
import { myProvider } from "@/lib/ai/providers";
import { Document as LlamaDocument, Metadata } from "@llamaindex/core/schema";
import {
  multiMarkdownNodeChunker,
  multiSentenceChunker,
} from "@/lib/llamaindex/chunking";
import { parseFinancialReportToMarkdown } from "@/lib/llamaindex/parse";

const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ].includes(file.type),
      {
        message: "File type should be PDF or DOCX",
      }
    ),
});

export async function POST(request: Request) {
  console.log("Calling upload knowledge... 🔍👀");

  const session = await auth();

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const validation = FileSchema.safeParse({ file });

  if (!validation.success) {
    const errorMessage = validation.error.errors
      .map((e) => e.message)
      .join(", ");
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  /* const SYS_PROMPT_SERVICE = `You are an intelligent document analysis agent specializing in financial and banking performance. Your task is to efficiently read, extract relevant information, and classify documents while strictly adhering to the provided guidelines.

# Instructions
- After receiving user data, extract relevant information and always call a tool to save it in the database.
- Currency used for  data: THB (Thai Baht, ฿).

# Precise document analysis Steps (for each document analysis)
1. Intelligent document analysis.
2. Call the tool corresponding to the classified document type.

## Example 1
## User
File

### Tool Calls
insertQuarterlyPerformanceRecord(quarterInYears="Q1/24",companyName="Kasikornbank")

## Example 2
## User
File

### Tool Calls
insertFinancialPerformanceRecord(quarterInYears="Q1/25",companyName="SCB")
`; */

  try {
    /* const fileText = await extractTextFromBlob(file);
    const messages: CoreMessage[] = [
      {
        role: "user",
        content: `Here is the content from the file :\n\n${fileText}`,
      },
    ];

    const result = streamText({
      model: myProvider.languageModel("chat-model"),
      system: SYS_PROMPT_SERVICE,
      messages,
      tools: {
        insertQuarterlyPerformanceRecord: tool({
          description: `Tool for identifying the reporting period (Q#/YY) and company name in Banking Performance documents.`,
          parameters: z.object({
            quarterInYear: z
              .string()
              .describe(
                "Quarter and year in the format 'Q#/YY', e.g., 'Q1/26' for the first quarter of 2026."
              ),
            companyName: z
              .string()
              .describe(
                "Name of the company referenced in the document, e.g., 'SCB', 'Kasikornbank', or 'PTT Public Company Limited'."
              ),
          }),
          execute: async ({ quarterInYear, companyName }) => {
            console.log(`Insert : "Banking Performance" 📉 🐙 🔍`);
            console.log("quarterInYear 🗓️ : ", quarterInYear);
            console.log("companyName 🏢 : ", companyName);
            await insertDocumentWithEmbeddings(quarterInYear, fileText);
          },
        }),
        insertFinancialPerformanceRecord: tool({
          description: `Tool for identifying the reporting period (Q#/YY) and company name in Financial Performances documents.`,
          parameters: z.object({
            quarterInYear: z
              .string()
              .describe(
                "Quarter and year in the format 'Q#/YY', e.g., 'Q1/26' for the first quarter of 2026."
              ),
            companyName: z
              .string()
              .describe(
                "Name of the company referenced in the document, e.g., 'SCB', 'Kasikornbank', or 'PTT Public Company Limited'."
              ),
          }),
          execute: async ({ quarterInYear, companyName }) => {
            console.log(`Insert : "Financial Performance" 📈 🪼 🔍`);
            console.log("quarterInYear 🗓️ : ", quarterInYear);
            console.log("companyName 🏢 : ", companyName);
          },
        }),
      },
    });
    console.log("result 🔥 :: ", result); */

    const markdownContent: LlamaDocument<Metadata>[] =
      await parseFinancialReportToMarkdown(file);

    if (markdownContent.length === 0) {
      return Response.json(
        {
          error: "Something is wrong",
        },
        { status: 500 }
      );
    }
    const markdownChunks: string[] = multiMarkdownNodeChunker(markdownContent);
    const markdownSentences: string[] = await multiSentenceChunker(
      markdownChunks
    );

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error("Error from pdf-parse:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to parse file" },
      { status: 500 }
    );
  }
}
