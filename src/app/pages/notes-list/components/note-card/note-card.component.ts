import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Note } from '../../../../shared/interfaces/note.interface';

import { NotesService } from '../../../../shared/services/notes.service';
import { NoteDialogService } from '../../../../shared/services/note-dialog.service';

import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @Input() note: Note = { id: '', title: '', content: '', isChecked: false };

  constructor(
    private noteService: NotesService,
    private noteDialogService: NoteDialogService
  ) {}

  editNote(note: Note): void {
    const dialogRef = this.noteDialogService.openNoteDialog(note);

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (result?.title || result?.content) {
        this.noteService.updateNote(result);
      }
    });
  }

  deleteNote(id: string): void {
    this.noteService.deleteNote(id);
  }

  checkNote(): void {
    this.noteService.setNotesOnLocalStorage();
  }

  saveNoteAsPdf(note: Note): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(note.title, 10, 20);

    doc.setFontSize(12);
    doc.text(doc.splitTextToSize(note.content, 190), 10, 30);

    doc.save(`${note.title}.pdf`);
  }
}
