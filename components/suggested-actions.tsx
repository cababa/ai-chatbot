'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Plan de Lecciones Dinámico',
      label: 'Genera un plan de lecciones interactivo para el aula',
      action: 'Ayúdame a crear un plan de lección basado en estrategias interactivas.',
    },
    {
      title: 'Actividades para Padres',
      label: 'Sugiere actividades para involucrar a las familias',
      action: 'Proporciona ideas de actividades educativas para la participación de los padres.',
    },
    {
      title: 'Estrategias Inclusivas',
      label: 'Enumera estrategias ayuden a la diversidad en el aula',
      action: 'Ayúdame a implementar métodos inclusivos para mejorar la enseñanza.',
    },
    {
      title: 'Organización del Calendario Escolar',
      label: 'Planifica el año escolar con actividades y eventos',
      action: 'Elabora un calendario académico con sugerencias mensuales para el aula.',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
