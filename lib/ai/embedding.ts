import { myProvider } from "./providers";
import { embed, embedMany } from "ai";
import { llamaSentenceChunker } from "./chunking";

const embeddingModel = "embedding-model";
export const generateEmbeddings = async (
  value: string
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = await llamaSentenceChunker(value);
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
