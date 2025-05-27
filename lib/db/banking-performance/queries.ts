import { bankingPerformances, financialPerformances } from "./../schema";
import "server-only";

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

import { generateEmbedding, generateEmbeddings } from "@/lib/ai/embedding";
import {
  GetFinancialPerformanceByQuarterRequest,
  GetFinancialPerformanceByQuarterResponse,
  GetSimilarityQuarterRequest,
  GetSimilarityQuarterResponse,
  GetSimilarityQuartersRequest as GetSimilarityMultiQuarterRequest,
  GetFinancialPerformanceMultiQuarterRequest,
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
      .from(bankingPerformances)
      .where(eq(bankingPerformances.quarter, normalizedQuarterName))
      .orderBy(desc(bankingPerformances.createdAt));

    return selectedDocument;
  } catch (error) {
    console.error("Failed to get document by id from database");
    throw error;
  }
}

export async function getDocumentAllByQuarter({
  quarterName,
}: {
  quarterName: string;
}): Promise<Array<typeof bankingPerformances.$inferSelect> | undefined> {
  try {
    const normalizedQuarterName = quarterName.toUpperCase();
    const allDocuments = await db
      .select()
      .from(bankingPerformances)
      .where(like(bankingPerformances.quarter, normalizedQuarterName))
      .orderBy(desc(bankingPerformances.createdAt));

    return allDocuments;
  } catch (error) {
    console.error("Failed to get document all by id from database");
    throw error;
  }
}

export async function getDocumentByQuarters({
  quartersInYears,
}: {
  quartersInYears: Array<string>;
}) {
  try {
    const normalizedQuarters = quartersInYears.map((q) => q.toUpperCase());
    const documents = await db
      .select()
      .from(bankingPerformances)
      .where(inArray(bankingPerformances.quarter, normalizedQuarters))
      .orderBy(desc(bankingPerformances.createdAt));

    return documents;
  } catch (error) {
    console.error("Failed to get documents by quarters from database", error);
    throw error;
  }
}

export async function insertDocumentWithEmbeddings(
  quarter: string,
  data: string
) {
  try {
    const newEmbeddings = await generateEmbeddings(data);
    await db.insert(bankingPerformances).values(
      newEmbeddings.map((embedding) => ({
        quarter,
        ...embedding,
      }))
    );
  } catch (error) {
    console.error("Failed to store chunks with embeddings in database");
    throw error;
  }
}

export async function getSimilarityQuarter({
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
      bankingPerformances.embedding,
      questionEmbedded
    )})`;

    const similarGuides = await db
      .select({
        quarter: bankingPerformances.quarter,
        content: bankingPerformances!.content,
        similarity,
      })
      .from(bankingPerformances)
      .where(
        and(
          eq(bankingPerformances.quarter, quartersInYear),
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
    console.error("Failed to get similar quarters from database", error);
    throw error;
  }
}

export async function getSimilarityMultiQuarter({
  question,
  quartersInYears,
  limit = 4,
  similarityThreshold = 0.5,
}: GetSimilarityMultiQuarterRequest): Promise<GetSimilarityQuarterResponse[]> {
  try {
    console.log("-------------- START 🔍 --------------");

    if (question.trim() === "" || !quartersInYears.length) {
      throw new Error("Question is empty. Please provide a valid question.");
    }

    const normalizedQuestion = question.toUpperCase();
    const questionEmbedded = await generateEmbedding(normalizedQuestion);

    quartersInYears = quartersInYears.map((q) => q.toUpperCase());

    console.log("Question : ", question);
    console.log("Quarter: ", quartersInYears);

    const similarity = sql<number>`1 - (${cosineDistance(
      bankingPerformances.embedding,
      questionEmbedded
    )})`;

    const similarGuides = await db
      .select({
        quarter: bankingPerformances.quarter,
        content: bankingPerformances!.content,
        similarity,
      })
      .from(bankingPerformances)
      .where(
        and(
          inArray(bankingPerformances.quarter, quartersInYears),
          gt(similarity, similarityThreshold)
        )
      )
      .orderBy((t) => desc(t.similarity))
      .limit(limit);

    if (!similarGuides || similarGuides.length === 0) {
      console.warn("No similar quarters found for the given query.");
      return [];
    }
    console.log("--------------- END ✅ ---------------");
    return similarGuides;
  } catch (error) {
    console.error("Failed to get similar quarters from database", error);
    throw error;
  }
}

export async function getFinancialPerformanceByQuarter({
  quartersInYear,
}: GetFinancialPerformanceByQuarterRequest): Promise<GetFinancialPerformanceByQuarterResponse> {
  try {
    const normalizedQuarterInYear = quartersInYear.toUpperCase();
    const [selectedDocument] = await db
      .select()
      .from(financialPerformances)
      .where(eq(financialPerformances.quarter, normalizedQuarterInYear))
      .orderBy(desc(financialPerformances.createdAt));
    if (!selectedDocument) {
      console.warn(
        `No financial performance data found for quarter: ${quartersInYear}`
      );
      return null;
    }

    return selectedDocument;
  } catch (error) {
    console.error(
      "Failed to get financial performance by quarter from database"
    );
    throw error;
  }
}

export async function getFinancialPerformanceMultiQuarter({
  quarterInYears,
}: GetFinancialPerformanceMultiQuarterRequest): Promise<
  GetFinancialPerformanceByQuarterResponse[]
> {
  try {
    console.log("-------------- START 🔍 --------------");

    const normalizedQuarterInYears = quarterInYears.map((q) => q.toUpperCase());

    console.log("QuarterInYears 👀 : ", normalizedQuarterInYears);

    const selectedDocument = await db
      .select()
      .from(financialPerformances)
      .where(inArray(financialPerformances.quarter, normalizedQuarterInYears))
      .orderBy(desc(financialPerformances.createdAt));
    if (!selectedDocument) {
      console.warn(
        `No financial performance data found for quarter: ${quarterInYears}`
      );
      return [];
    }
    console.log("--------------- END ✅ ---------------");
    return selectedDocument;
  } catch (error) {
    console.error(
      "Failed to get financial performance by quarter from database"
    );
    throw error;
  }
}

export async function getSimilarityMultiYearQuarter() {
  // This function is a placeholder for future implementation
  // It should handle multiple years and return similar quarters
  throw new Error("getSimilarityMultiYearQuarter is not implemented yet.");
}
