import { google } from '@ai-sdk/google';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
  generateText,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

export const myProvider = customProvider({
  languageModels: {
    // Use a flash-lite preview for quick/light tasks
    'chat-model-small': google('gemini-1.5-flash-lite-preview-02-05'),
    // Use the pro latest model for complex multi-step tasks
    'chat-model-large': google('gemini-1.5-pro-latest'),
    // Wrap a pro model with reasoning middleware for advanced reasoning
    'chat-model-reasoning': wrapLanguageModel({
      model: google('gemini-1.5-pro-latest', {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_UNSPECIFIED',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
        ],
      }),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    // Other models can be defined similarly
    'title-model': google('gemini-1.5-pro-latest'),
    'artifact-model': google('gemini-1.5-flash-lite-preview-02-05'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model-small',
    name: 'Modelo pequeño',
    description: 'Modelo pequeño para tareas rápidas y ligeras',
  },
  {
    id: 'chat-model-large',
    name: 'Modelo grande',
    description: 'Modelo grande para tareas complejas de varios pasos',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Modelo de razonamiento',
    description: 'Utiliza razonamiento avanzado',
  },
];

// // Example usage:
// async function testGeneration() {
//   const { text } = await generateText({
//     model: google('gemini-1.5-pro-latest'),
//     prompt: 'Write a vegetarian lasagna recipe for 4 people.',
//   });
//   console.log('Generated text:', text);
// }

// testGeneration().catch(console.error);