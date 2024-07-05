import { Component, ElementRef, Input, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Note } from '../../../../shared/interfaces/note.interface';

import { NotesService } from '../../../../shared/services/notes/notes.service';
import { NoteDialogService } from '../../../../shared/services/note-dialog/note-dialog.service';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  @ViewChildren('imagesTemplateRef') imagesTemplateRefs!: ElementRef[];

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

    this.imagesToPdf(doc, note);
  }

  private imagesToPdf(doc: jsPDF, note: Note): void {
    let x = 5;
    let y = 100;
    let pageHeight = doc.internal.pageSize.height;

    if (this.imagesTemplateRefs?.length > 0) {
      this.imagesTemplateRefs.forEach((imageRef, index) => {
        const element = imageRef.nativeElement;
        html2canvas(element).then((canvas) => {
          const imgData = canvas.toDataURL('image/jpeg');

          const imgWidth = 200;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (y + imgHeight > pageHeight - 20) {
            doc.addPage();
            y = 40;
          }

          doc.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);

          y += imgHeight + 10;

          if (index === this.imagesTemplateRefs.length - 1) {
            doc.save(`${note.title}.pdf`);
          }
        });
      });
    } else {
      doc.save(`${note.title}.pdf`);
    }
  }
}
