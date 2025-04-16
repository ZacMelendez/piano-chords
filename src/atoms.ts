import { atom } from "jotai";
import { Note } from "./types";

export const selectedNoteAtom = atom<Note>("C");
export const useSharpsAtom = atom<boolean>(true);
