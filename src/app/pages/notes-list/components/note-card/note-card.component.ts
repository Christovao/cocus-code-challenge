import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Note } from '../../../../shared/interfaces/note.interface';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @Input() note: Note = { title: '', content: '' };

  editNote(): void {}

  deleteNote(): void {}
}
