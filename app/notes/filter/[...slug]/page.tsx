import { fetchNotes } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NoteSlugClient from './Notes.client';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === 'all' ? 'All' : slug[0];
  return {
    title: `${category} Note`,
    description: `${category} Note`,
    openGraph: {
      title:`${category} Note`,
      description: `${category} Note`,
      url: `https://notehub.com/notes/filter/${category}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${category} Note`,
        },
      ],
      type: 'article',
    },
  };
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
      <NoteSlugClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesPage;
