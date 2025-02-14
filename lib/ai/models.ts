import { google } from '@ai-sdk/google';
import {
  customProvider,
  generateText,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

export const myProvider = customProvider({
  languageModels: {
    // Use a flash-lite preview for quick/light tasks
    'chat-model-small': google('gemini-2.0-flash-lite-preview-02-05'),
    // Use the pro latest model for complex multi-step tasks
    'chat-model-large': google('gemini-2.0-flash'),
    // Non-reasoning model; google no longer provides a reasoning version.
    'chat-model-reasoning': google('gemini-2.0-flash-thinking-exp-01-21'),
    // Other models can be defined similarly
    'title-model': google('gemini-2.0-flash-lite-preview-02-05'),
    'artifact-model': google('gemini-2.0-flash'),
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