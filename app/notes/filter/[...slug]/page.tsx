import { fetchNotes } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NoteSlugClient from './Notes.client';

interface Props {
  params: Promise<{ slug: string[] }>;
}

const NotesPage = async ({ params }: Props) => {

  const queryClient = new QueryClient();

  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', category],
    queryFn: () => fetchNotes(1, '', category),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteSlugClient category={category}/>
    </HydrationBoundary>
  );
};

export default NotesPage;
