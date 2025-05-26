import "server-only";

import { desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { financialPerformances } from "../schema";

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
      .from(financialPerformances)
      .where(eq(financialPerformances.quarter, normalizedQuarterName))
      .orderBy(desc(financialPerformances.createdAt));

    return selectedDocument;
  } catch (error) {
    console.error("Failed to get document by id from database");
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
      .from(financialPerformances)
      .where(inArray(financialPerformances.quarter, normalizedQuarters))
      .orderBy(desc(financialPerformances.createdAt));

    return documents;
  } catch (error) {
    console.error("Failed to get documents by quarters from database", error);
    throw error;
  }
}
