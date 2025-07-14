import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes_services/notes.service';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  viewType: string = 'grid';
  constructor(
    private notesService: NotesService,
    private viewTypeService: ViewTypeService
  ) {}

  ngOnInit(): void {
    this.viewTypeService.viewType$.subscribe((value: string) => {
      this.viewType = value;
    });
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getUserNotes().subscribe({
      next: (res: any) => {
        this.notes = res.data.data.filter((note: any) => !note.isDeleted && !note.isArchived);
      },
      error: (err) => {
        console.error('Failed to load notes:', err);
      }
    });
  }

  onNoteDeleted(deletedId: string): void {
    this.notes = this.notes.filter(note => note._id !== deletedId);
  }
}
 