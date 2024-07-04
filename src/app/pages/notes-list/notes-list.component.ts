import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteDialogComponent } from '../../shared/components/note-dialog/note-dialog.component';

import { Note } from '../../shared/interfaces/note.interface';

import { NotesService } from '../../shared/services/notes.service';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NoteCardComponent,
  ],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.notes = this.noteService.getAllNotes();
  }

  createNote(): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '400px',
      data: {
        title: '',
        content: '',
      },
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (result?.title || result?.content) {
        this.noteService.createNote(result);
      }
    });
  }
}
