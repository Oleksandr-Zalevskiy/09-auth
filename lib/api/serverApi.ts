import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const createServerApi = async () => {
  const cookieStore = await cookies();

  return axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: NoteTag,
): Promise<FetchNotesResponse> => {
  const api = await createServerApi();
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, search, tag, perPage: 12 },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const api = await createServerApi();
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const getMe = async (): Promise<User> => {
  const api = await createServerApi();
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const checkSession = async (): Promise<AxiosResponse<User | null>> => {
  const api = await createServerApi();
  return api.get<User | null>("/auth/session");
};
