import { inject, Injectable } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { NoteDialogComponent } from '../components/note-dialog/note-dialog.component';

import { Note } from '../interfaces/note.interface';

import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NoteDialogService {
  readonly dialog = inject(MatDialog);

  openNoteDialog(note?: Note): MatDialogRef<NoteDialogComponent> {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '400px',
      data: {
        id: note?.id || uuidv4(),
        title: note?.title || '',
        content: note?.content || '',
        isChecked: note?.isChecked || false,
      } as Note,
    });

    return dialogRef;
  }
}
