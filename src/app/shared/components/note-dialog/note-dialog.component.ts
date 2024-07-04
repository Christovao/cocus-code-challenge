import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Note } from '../../interfaces/note.interface';

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss',
})
export class NoteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NoteDialogComponent>);
  readonly data = inject<Note>(MAT_DIALOG_DATA);
  readonly note = model(this.data);
}
