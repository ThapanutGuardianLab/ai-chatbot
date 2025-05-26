import "server-only";

import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { bankingPerformances } from "../schema";
import { generateEmbeddings } from "@/lib/ai/embedding";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function getDocumentById({ id }: { id: string }) {
  try {
    const [selectedDocument] = await db
      .select()
      .from(bankingPerformances)
      .where(eq(bankingPerformances.id, id))
      .orderBy(desc(bankingPerformances.createdAt));

    return selectedDocument;
  } catch (error) {
    console.error("Failed to get document by id from database");
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

/* export const findRelevantContent = async ({
  userQuery,
  similarity = 0.5,
  k = 4,
}: {
  userQuery: string;
  similarity?: number;
  k?: number;
}) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similaritySQL = sql<number>`1 - (${cosineDistance(
    bankingPerformanceEmbeddings.embedding,
    userQueryEmbedded
  )})`;
  const similarGuides = await db
    .select({ name: bankingPerformanceEmbeddings.content, similaritySQL })
    .from(bankingPerformanceEmbeddings)
    .where(gt(similaritySQL, similarity))
    .orderBy((t) => desc(t.similaritySQL))
    .limit(k);
  return similarGuides;
}; */
