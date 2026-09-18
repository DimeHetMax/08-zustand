import { create } from 'zustand';
import { CreateNewNote } from '@/types/note';
import { persist } from 'zustand/middleware';
type AuthStore = {
  draft: CreateNewNote;
  setDraft: (note: CreateNewNote) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};
export const useCreateStore = create<AuthStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
