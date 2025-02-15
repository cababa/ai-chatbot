import { getChatsByUserId } from '@/lib/db/queries';

export async function GET() {
  const chats = await getChatsByUserId({ id: 'anonymous' });
  return new Response(JSON.stringify(chats));
}