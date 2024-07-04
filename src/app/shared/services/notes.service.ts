import { Injectable } from '@angular/core';

import { Note } from '../interfaces/note.interface';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes: Note[] = [];
  private notesSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(
    this.notes
  );

  getAllNotes(): Note[] {
    return this.notes;
  }

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  createNote(note: Note): void {
    this.notes.push(note);
    this.notesSubject.next(this.notes);
  }

  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(
      (note: Note) => note.id === updatedNote.id
    );

    if (index > -1) {
      this.notes[index] = updatedNote;
      this.notesSubject.next(this.notes);
    }
  }

  deleteNote(id: string): void {
    this.notes = this.notes.filter((note: Note) => note.id !== id);
    this.notesSubject.next(this.notes);
  }
}
