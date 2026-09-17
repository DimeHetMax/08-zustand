import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { getNoteById } from '@/lib/api';
type Props = {
  params: Promise<{ id: string }>;
};
const NoteDetails = async ({ params }: Props) => {
 const queryClient = new QueryClient()

  const { id } = await params;

    await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => getNoteById(id),

    });
  return (
   <div>
    <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient/>
    </HydrationBoundary>
   </div>
  );
};
export default NoteDetails;
