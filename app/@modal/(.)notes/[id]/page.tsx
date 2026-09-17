import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';
import { getNoteById } from '@/lib/api';
type Props = {
  params: Promise<{ id: string }>;
};
const NotePreview = async ({ params }: Props) => {
 const queryClient = new QueryClient()

  const { id } = await params;

    await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => getNoteById(id),

    });
  return (
   <div>
    <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient/>
    </HydrationBoundary>
   </div>
  );
};
export default NotePreview;
