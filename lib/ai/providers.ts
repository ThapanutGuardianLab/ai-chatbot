import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { azure } from "@ai-sdk/azure";
import { google } from "@ai-sdk/google";
import { isTestEnvironment } from "../constants";
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from "./models.test";

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        "chat-model": chatModel,
        "chat-model-reasoning": reasoningModel,
        "title-model": titleModel,
        "artifact-model": artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        "chat-model": azure("gpt-4.1-mini"),
        "chat-model-reasoning": wrapLanguageModel({
          model: azure("gpt-4.1-mini"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": azure("gpt-4.1-mini"),
        "artifact-model": azure("gpt-4.1-mini"),
      },
      textEmbeddingModels: {
        "embedding-model": azure.textEmbeddingModel("text-embedding-004"),
      },
    });
// : customProvider({
//     languageModels: {
//       "chat-model": google("gemini-1.5-flash"),
//       "chat-model-reasoning": wrapLanguageModel({
//         model: google("gemini-1.5-flash"),
//         middleware: extractReasoningMiddleware({ tagName: "think" }),
//       }),
//       "title-model": google("gemini-1.5-flash"),
//       "artifact-model": google("gemini-1.5-flash"),
//     },
//     textEmbeddingModels: {
//       "embedding-model": google.textEmbeddingModel("text-embedding-004"),
//     },
//   });
// customProvider({
//   languageModels: {
//     "chat-model": openai("gpt-3.5-turbo"),
//     "chat-model-reasoning": wrapLanguageModel({
//       model: openai("gpt-3.5-turbo"),
//       middleware: extractReasoningMiddleware({ tagName: "think" }),
//     }),
//     "title-model": openai("gpt-3.5-turbo"),
//     "artifact-model": openai("gpt-3.5-turbo"),
//   },
//   imageModels: {
//     "small-model": openai.image("dall-e-3"), // ใช้ DALL·E 3 สำหรับภาพ
//   },
//   textEmbeddingModels: {
//     "embedding-model": openai.embedding("text-embedding-3-small"),
//   },
// });
