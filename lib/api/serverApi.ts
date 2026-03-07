import { api } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import type { NoteTag } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

interface AuthPayload {
  email: string;
  password: string;
}

interface UpdateUserPayload {
  username: string;
}

export const register = async (payload: AuthPayload): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
};

export const login = async (payload: AuthPayload): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get<User | null>("/auth/session");
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (payload: UpdateUserPayload): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: NoteTag,
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search, tag, perPage: 12 },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  payload: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
