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
          model: azure("o3-mini"),
          middleware: extractReasoningMiddleware({
            tagName: "think",
          }),
        }),
        "title-model": azure("gpt-4.1-mini"),
        "artifact-model": azure("gpt-4.1-mini"),
        "evaluate-model": azure("gpt-4o-mini"),
      },
      textEmbeddingModels: {
        "embedding-model": azure.textEmbeddingModel("text-embedding-004"),
      },
    });
/* : customProvider({
      languageModels: {
        "chat-model": openai("gpt-4.1-mini"),
        "evaluate-model": openai("gpt-3.5-turbo"),
        "chat-model-reasoning": wrapLanguageModel({
          model: openai("o4-mini"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": openai("gpt-4o"),
        "artifact-model": openai("gpt-4o"),
      },
      imageModels: {
        "small-model": openai.image("dall-e-3"),
      },
      textEmbeddingModels: {
        "embedding-model": openai.embedding("text-embedding-ada-002"),
      },
    }); */
