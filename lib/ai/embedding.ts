import { myProvider } from "./providers";
import { embed, embedMany } from "ai";
import { multiSentenceChunker, sentenceChunker } from "../llamaindex/chunking";

const embeddingModel = "embedding-model";
export const generateTextEmbeddings = async (
  value: string
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = await sentenceChunker(value);
  const { embeddings } = await embedMany({
    model: myProvider.textEmbeddingModel(embeddingModel),
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateMultiTextEmbeddings = async (
  value: string[]
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = await multiSentenceChunker(value);
  const { embeddings } = await embedMany({
    model: myProvider.textEmbeddingModel(embeddingModel),
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: myProvider.textEmbeddingModel(embeddingModel),
    value: input,
  });
  return embedding;
};
