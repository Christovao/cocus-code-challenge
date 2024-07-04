import { Injectable } from '@angular/core';

import { Note } from '../interfaces/note.interface';

import { BehaviorSubject, Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes: Note[] = [];
  private notesSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(
    this.notes
  );

  constructor(private localStorageService: LocalStorageService) {}

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  setNotes(notes: Note[]): void {
    this.notes = notes;
    this.notesSubject.next(this.notes);
  }

  createNote(note: Note): void {
    this.notes.push(note);
    this.setNotesOnLocalStorage();
    this.notesSubject.next(this.notes);
  }

  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(
      (note: Note) => note.id === updatedNote.id
    );

    if (index > -1) {
      this.notes[index] = updatedNote;
      this.setNotesOnLocalStorage();
      this.notesSubject.next(this.notes);
    }
  }

  deleteNote(id: string): void {
    this.notes = this.notes.filter((note: Note) => note.id !== id);
    this.setNotesOnLocalStorage();
    this.notesSubject.next(this.notes);
  }

  setNotesOnLocalStorage(): void {
    this.localStorageService.setItem(
      this.localStorageService.notesKey,
      JSON.stringify(this.notes)
    );
  }
}
