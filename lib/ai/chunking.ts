import {
  SentenceSplitter,
  MarkdownNodeParser,
} from "@llamaindex/core/node-parser";
import { Document as LlamaDocument } from "@llamaindex/core/schema";
export const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const llamaSentenceChunker = async (
  input: string,
  chunkSize: number = 8192,
  chunkOverlap: number = 50
): Promise<string[]> => {
  const splitter = new SentenceSplitter({
    chunkSize,
    chunkOverlap,
  });
  return splitter.splitText(input);
};

export const markdownNodeParserChunker = (text: string): string[] => {
  const splitter = new MarkdownNodeParser();
  const nodes = splitter.getNodesFromDocuments([new LlamaDocument({ text })]);
  const output = nodes.map((node) => node.text);
  return output;
};
