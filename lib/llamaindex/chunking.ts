import {
  MarkdownNodeParser,
  SentenceSplitter,
} from "@llamaindex/core/node-parser";
import { Document as LlamaDocument, Metadata } from "@llamaindex/core/schema";
export const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const sentenceChunker = async (
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

export const multiSentenceChunker = async (
  input: string[],
  chunkSize: number = 8192,
  chunkOverlap: number = 50
): Promise<string[]> => {
  const splitter = new SentenceSplitter({
    chunkSize,
    chunkOverlap,
  });
  splitter.splitTexts;
  return splitter.splitTexts(input);
};

export const markdownNodeChunker = (text: string): string[] => {
  const splitter = new MarkdownNodeParser();
  const nodes = splitter.getNodesFromDocuments([new LlamaDocument({ text })]);
  const output = nodes.map((node) => node.text);
  return output;
};

export const multiMarkdownNodeChunker = (
  metaDocs: LlamaDocument<Metadata>[]
): string[] => {
  const splitter = new MarkdownNodeParser();
  const nodes = splitter.getNodesFromDocuments(metaDocs);
  return nodes.map((node) => node.text);
};
