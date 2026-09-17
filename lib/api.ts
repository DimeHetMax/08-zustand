import axios from "axios";

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` },
});
import type { Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  currentPage: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await API.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      tag,
      page: currentPage,
      perPage: 12,
    },
  });
  return response.data;
};

export const createNote = async (body: Pick<Note, "title" | "content" | "tag">):Promise<Note> => {
  const response = await API.post<Note>("/notes", body);
  return response.data;
};

export const deleteNote = async(id: string):Promise<Note> => {
 const response = await API.delete<Note>(`/notes/${id}`);
 return response.data
};

export const getNoteById = async(id:string):Promise<Note>=>{
  const response = await API.get<Note>(`/notes/${id}`);
  return response.data;
}