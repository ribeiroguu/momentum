import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "@/types";

interface NotesContextData {
  notes: Note[];
  loading: boolean;
  addNote: (title: string, content: string) => Promise<Note>;
  updateNote: (id: string, title: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getNote: (id: string) => Note | undefined;
}

export const NotesContext = createContext<NotesContextData>({} as NotesContextData);

const NOTES_STORAGE_KEY = "@momentum:notes";

interface NotesProviderProps {
  children: ReactNode;
}

export function NotesProvider({ children }: NotesProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const storedNotes = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveNotes(newNotes: Note[]) {
    try {
      await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  }

  async function addNote(title: string, content: string): Promise<Note> {
    const newNote: Note = {
      id: Date.now().toString(),
      title: title || "Nota sem título",
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updatedNotes = [newNote, ...notes];
    await saveNotes(updatedNotes);
    return newNote;
  }

  async function updateNote(id: string, title: string, content: string) {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? { ...note, title, content, updatedAt: Date.now() }
        : note
    );
    await saveNotes(updatedNotes);
  }

  async function deleteNote(id: string) {
    const updatedNotes = notes.filter((note) => note.id !== id);
    await saveNotes(updatedNotes);
  }

  function getNote(id: string): Note | undefined {
    return notes.find((note) => note.id === id);
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        addNote,
        updateNote,
        deleteNote,
        getNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
