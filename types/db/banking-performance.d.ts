export type GetBankingPerformancesIdRequest = {
  params: { documentId: string };
};

export type GetSimilarityQuarterRequest = {
  question: string;
  quartersInYear: string;
  limit?: number;
  similarityThreshold?: number;
};
export type GetSimilarityQuarterResponse = {
  quarter: string;
  similarity: number;
}[];
