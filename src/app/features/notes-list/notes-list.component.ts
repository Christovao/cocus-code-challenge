import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { NoteCardComponent } from './components/note-card/note-card.component';

import { Note } from '../../shared/interfaces/note.interface';

import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';
import { NoteDialogService } from '../../shared/services/note-dialog/note-dialog.service';
import { NotesService } from '../../shared/services/notes/notes.service';

import { map, Observable, of } from 'rxjs';

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
  filteredNotes$: Observable<Note[]> = of([]);

  constructor(
    private noteService: NotesService,
    private noteDialogService: NoteDialogService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    const notesStorage = this.localStorageService.getItem(
      this.localStorageService.notesKey
    ) as Note[];

    notesStorage && this.noteService.setNotes(notesStorage);
    this.notes$ = this.noteService.getNotes();
    this.filteredNotes$ = this.notes$;
  }

  createNote(): void {
    const dialogRef = this.noteDialogService.openNoteDialog();

    dialogRef.afterClosed().subscribe((result: Note) => {
      if (result?.title || result?.content) {
        this.noteService.createNote(result);
      }
    });
  }

  onSearch(event: any): void {
    const searchTerm = (event.target as HTMLInputElement).value;

    this.filteredNotes$ = this.notes$.pipe(
      map((notes: Note[]) =>
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm)
        )
      )
    );
  }
}
