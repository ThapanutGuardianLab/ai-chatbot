export type GetBankingPerformancesIdRequest = {
  params: { documentId: string };
};

export type GetSimilarityQuarterRequest = {
  question: string;
  quartersInYear: string;
  limit?: number;
  similarityThreshold?: number;
};

export type GetSimilarityQuartersRequest = {
  question: string;
  quartersInYears: Array<string>;
  limit?: number;
  similarityThreshold?: number;
};

export type GetSimilarityQuarterResponse = {
  quarter: string;
  content: string | null;
  similarity: number;
};

export type GetFinancialPerformanceByQuarterRequest = {
  quartersInYear: string;
};

export type GetFinancialPerformanceMultiQuarterRequest = {
  quarterInYears: Array<string>;
};
export type GetFinancialPerformanceByQuarterResponse = InferModel<
  typeof financialPerformances
>;
