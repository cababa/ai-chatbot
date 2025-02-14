# Update Models

The chatbot template now uses Gemini API as the model provider instead of OpenAI. Since the template is powered by the [AI SDK](https://sdk.vercel.ai) which supports multiple providers out of the box, you can easily switch providers by updating the custom provider called `myProvider` at `/lib/ai/models.ts` shown below.

```ts
import { gemini } from "@ai-sdk/gemini";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

export const myProvider = customProvider({
  languageModels: {
    "chat-model-small": gemini("gemini-2.0-flash-lite-preview-02-05"),
    "chat-model-large": gemini("gemini-2.0-flash"),
    "chat-model-reasoning": wrapLanguageModel({
      model: gemini("gemini-2.0-flash-thinking-exp-01-21"),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    "title-model": gemini("gemini-2.0-flash"),
    "artifact-model": gemini("gemini-2.0-flash-lite-preview-02-05"),
  },
  imageModels: {
    "small-model": gemini.image("dall-e-2"),
    "large-model": gemini.image("dall-e-3"),
  },
});

Make sure to set the environment variable GEMINI_API_KEY in your .env file so that the Gemini SDK can authenticate requests.

You can replace the Gemini models with any other provider of your choice by updating the models accordingly.