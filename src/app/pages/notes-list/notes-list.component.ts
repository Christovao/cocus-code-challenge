import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { NoteCardComponent } from './components/note-card/note-card.component';

import { Note } from '../../shared/interfaces/note.interface';

import { NotesService } from '../../shared/services/notes.service';
import { NoteDialogService } from '../../shared/services/note-dialog.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';

import { Observable, of } from 'rxjs';

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
  notes$: Observable<Note[]> = of([]);

  readonly dialog = inject(MatDialog);

  constructor(
    private noteService: NotesService,
    private noteDialogService: NoteDialogService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    if (this.localStorageService.getItem('notes')) {
      const notesStorage = JSON.parse(this.localStorageService.getItem('notes')!) as Note[];
      this.noteService.setNotes(notesStorage);
    }

    this.notes$ = this.noteService.getNotes();
  }

  createNote(): void {
    const dialogRef = this.noteDialogService.openNoteDialog();

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (result?.title || result?.content) {
        this.noteService.createNote(result);
      }
    });
  }
}
