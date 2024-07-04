import { Injectable } from '@angular/core';

import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes: Note[] = []

  getAllNotes(): Note[] {
    return this.notes;
  }

  createNote(note: Note): void {
    this.notes.push(note);
  }
}
