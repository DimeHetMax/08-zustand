'use client'
import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import Link from "next/link";
import { deleteNote } from "@/lib/api";
import { useMutation , useQueryClient} from "@tanstack/react-query";
interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: deleteNote,
     onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },

  })
  return (
    <ul className={css.list}>
      {notes.map(({ title, id, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
             <Link href={`/notes/${id}`} className={css.link}>View details</Link>
            <button className={css.button} onClick={()=>mutate(id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default NoteList;
