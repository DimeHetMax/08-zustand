'use client';
import css from './NoteForm.module.css';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useCreateStore } from '@/lib/store/noteStore';
import React from 'react';
import { useRouter } from 'next/navigation';
import { CreateNewNote } from '@/types/note';

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useCreateStore();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push('/notes/filter/all');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as CreateNewNote;
    mutate(values);
  };
   const handleCancel = () => router.push('/notes/filter/all');
  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft.title}
          onChange={onChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={onChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={onChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
};
export default NoteForm;
