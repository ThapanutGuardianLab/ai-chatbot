import "server-only";

import { desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { financialPerformances } from "../schema";
import {
  GetFinancialPerformanceByQuarterRequest,
  GetFinancialPerformanceByQuarterResponse,
  GetFinancialPerformanceMultiQuarterRequest,
} from "@/types/db/banking-performance";

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

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
  controller,
}: GetFinancialPerformanceMultiQuarterRequest): Promise<
  GetFinancialPerformanceByQuarterResponse[]
> {
  try {
    console.log("-------------- START 🔍 --------------");

    const normalizedQuarterInYears = quarterInYears.map((q) => q.toUpperCase());

    if (normalizedQuarterInYears.length === 0) {
      console.error(
        "Error 🔥 : No quarters provided. Please provide valid quarters."
      );
      controller.abort();
    }

    console.log("QuarterInYears 👀 : ", normalizedQuarterInYears);

    const selectedDocument = await db
      .select()
      .from(financialPerformances)
      .where(inArray(financialPerformances.quarter, normalizedQuarterInYears))
      .orderBy(desc(financialPerformances.createdAt));
    if (!selectedDocument) {
      console.error(
        `No financial performance data found for quarter: ${quarterInYears.join(
          ","
        )}`
      );
      controller.abort();
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
