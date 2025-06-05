import "server-only";

import { financialReport } from "../schema";
import {
  cosineDistance,
  desc,
  eq,
  inArray,
  like,
  sql,
  gt,
  and,
} from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Document as LlamaDocument, Metadata } from "@llamaindex/core/schema";
import {
  multiMarkdownNodeChunker,
  multiSentenceChunker,
} from "@/lib/llamaindex/chunking";
import { parseFinancialReportToMarkdown } from "@/lib/llamaindex/parse";

import { generateEmbedding } from "@/lib/ai/embedding";
import {
  GetSimilarityQuarterRequest,
  GetSimilarityQuarterResponse,
  GetSimilarityQuartersRequest as GetSimilarityMultiQuarterRequest,
} from "@/types/db/banking-performance";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function getDocumentByQuarter({
  quarterName,
}: {
  quarterName: string;
}) {
  try {
    const normalizedQuarterName = quarterName.toUpperCase();
    const [selectedDocument] = await db
      .select()
      .from(financialReport)
      .where(eq(financialReport.quarter, normalizedQuarterName))
      .orderBy(desc(financialReport.createdAt));

    return selectedDocument;
  } catch (error) {
    console.error("Error 🔥 : Failed to get document by id from database");
    throw error;
  }
}

export async function getDocumentAllByQuarter({
  quarterName,
}: {
  quarterName: string;
}): Promise<Array<typeof financialReport.$inferSelect> | undefined> {
  try {
    const normalizedQuarterName = quarterName.toUpperCase();
    const allDocuments = await db
      .select()
      .from(financialReport)
      .where(like(financialReport.quarter, normalizedQuarterName))
      .orderBy(desc(financialReport.createdAt));

    return allDocuments;
  } catch (error) {
    console.error("Error 🔥 : Failed to get document all by id from database");
    throw error;
  }
}

export async function insertDocument(quarter: string, file: Blob) {
  try {
    console.log(
      "-------------- insertDocumentWithEmbeddingV2 START 🔍 --------------"
    );
    const markdownMultiContent: LlamaDocument<Metadata>[] =
      await parseFinancialReportToMarkdown(file);

    if (markdownMultiContent.length === 0) {
      return Response.json(
        {
          error: "Something is wrong",
        },
        { status: 500 }
      );
    }
    const markdownMultiChunk: string[] =
      multiMarkdownNodeChunker(markdownMultiContent);
    const markdownMultiSentence: string[] = await multiSentenceChunker(
      markdownMultiChunk
    );

    const chunks = await multiSentenceChunker(markdownMultiSentence);

    await db.insert(financialReport).values(
      chunks.map((chunk) => ({
        quarter,
        content: chunk,
      }))
    );
    console.log(
      "--------------- insertDocumentWithEmbeddings END ✅ ---------------"
    );
  } catch (error) {
    console.error(
      "Error 🔥 : Failed to store chunks with embeddings in database"
    );
    throw error;
  }
}

/* export async function getSimilarityQuarter({
  question,
  quartersInYear,
  limit = 4,
  similarityThreshold = 0.5,
}: GetSimilarityQuarterRequest): Promise<GetSimilarityQuarterResponse[]> {
  try {
    console.log("-------------- START 🔍 --------------");

    if (question.trim() === "" || !quartersInYear.length) {
      throw new Error("Question is empty. Please provide a valid question.");
    }

    const normalizedQuestion = question.toUpperCase();
    const questionEmbedded = await generateEmbedding(normalizedQuestion);

    console.log("Question : ", question);
    console.log("Quarter: ", quartersInYear);

    const similarity = sql<number>`1 - (${cosineDistance(
      financialReport.embedding,
      questionEmbedded
    )})`;

    const similarGuides = await db
      .select({
        quarter: financialReport.quarter,
        content: financialReport!.content,
        similarity,
      })
      .from(financialReport)
      .where(
        and(
          eq(financialReport.quarter, quartersInYear),
          gt(similarity, similarityThreshold)
        )
      )
      .orderBy((t) => desc(t.similarity))
      .limit(limit);

    console.log("--------------- END ✅ ---------------");
    if (!similarGuides || similarGuides.length === 0) {
      console.warn("No similar quarters found for the given query.");
      return [];
    }
    return similarGuides;
  } catch (error) {
    console.error(
      "Error 🔥 : Failed to get similar quarters from database",
      error
    );
    throw error;
  }
} */

export async function getSimilarityMultiQuarter({
  question,
  quartersInYears,
  controller,
  limit = 4,
  similarityThreshold = 0.5,
}: GetSimilarityMultiQuarterRequest): Promise<
  {
    quarter: string;
    content: string | null;
  }[]
> {
  try {
    console.log(
      "-------------- getSimilarityMultiQuarter START 🔍 --------------"
    );

    if (question.trim() === "" || !quartersInYears.length) {
      console.error(
        "Error 🔥 : Question is empty. Please provide a valid question."
      );
      controller.abort();
    }

    quartersInYears = quartersInYears.map((q) => q.toUpperCase());

    console.log("Question : ", question);
    console.log("Quarter: ", quartersInYears);
    console.log("similarityThreshold: ", similarityThreshold);

    const similarGuides = await db
      .select({
        quarter: financialReport.quarter,
        content: financialReport!.content,
        createdAt: financialReport.createdAt,
      })
      .from(financialReport)
      .where(and(inArray(financialReport.quarter, quartersInYears)))
      .orderBy((t) => desc(t.createdAt))
      .limit(limit);

    if (!similarGuides || similarGuides.length === 0) {
      console.error(
        "Error 🔥 : No similar quarters found for the given query."
      );
      controller.abort();
    }
    console.log("--------------- END ✅ ---------------");
    return similarGuides;
  } catch (error) {
    console.error(
      "Error 🔥 : Failed to get similar quarters from database",
      error
    );
    throw error;
  }
}
