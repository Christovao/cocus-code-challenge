import { Component, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Note } from '../../interfaces/note.interface';

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.scss',
})
export class NoteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NoteDialogComponent>);
  readonly data = inject<Note>(MAT_DIALOG_DATA);
  readonly note = model(this.data);

  imageSrcs: any[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];

      const reader = new FileReader();

      reader.onload = (e: any) => {
        const imgUrl = e.target.result
        const imgSanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(
          e.target.result
        );

        this.data.images?.push(imgUrl);
        this.imageSrcs.push(imgSanitizedUrl);
      };

      reader.readAsDataURL(selectedFile);
    }
  }

  removeImage(index: number): void {
    this.imageSrcs.splice(index, 1);
    this.data.images?.splice(index, 1);
  }
}
