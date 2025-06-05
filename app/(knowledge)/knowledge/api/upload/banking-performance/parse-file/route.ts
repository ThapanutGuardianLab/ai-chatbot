import { NextResponse, type NextRequest } from "next/server";
import { parseFinancialReportToMarkdown } from "@/lib/llamaindex/parse";
import { Document as LlamaDocument, Metadata } from "@llamaindex/core/schema";
import {
  llamaMarkdownNodesChunker,
  multiSentenceChunker,
} from "@/lib/llamaindex/chunking";

export async function POST(request: NextRequest) {
  console.log("Calling Parse File 📰👀");
  const formData = await request.formData();
  const file = formData.get("file") as Blob;

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  try {
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
    const markdownChunks: string[] = llamaMarkdownNodesChunker(markdownContent);
    const markdownSentences: string[] = await multiSentenceChunker(
      markdownChunks
    );
    console.log(
      "MarkdownSentences 🪼 : ",
      JSON.stringify(markdownSentences, null, 4)
    );

    return Response.json(
      { markdownContent, markdownChunks, markdownSentences },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error : ", error);

    return Response.json(error, { status: 500 });
  }
}
