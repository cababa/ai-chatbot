import { getSuggestionsByDocumentId } from '@/lib/db/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const documentId = searchParams.get('documentId');

  if (!documentId) {
    return new Response('Not Found', { status: 404 });
  }

  const suggestions = await getSuggestionsByDocumentId({ documentId });
  if (!suggestions || suggestions.length === 0) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  return new Response(JSON.stringify(suggestions), { status: 200 });
}