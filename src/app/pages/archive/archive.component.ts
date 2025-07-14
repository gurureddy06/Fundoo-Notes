import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes_services/notes.service';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  archivedNotes: any[] = [];
  viewType: string = 'grid';

  constructor(
    private notesApi: NotesService,
    private viewTypeService: ViewTypeService
  ) {}

  ngOnInit(): void {
    this.viewTypeService.viewType$.subscribe((value) => {
      this.viewType = value;
    });

    this.loadArchivedNotes();
  }

  loadArchivedNotes() {
    this.notesApi.getUserNotes().subscribe({
      next: (res: any) => {
        this.archivedNotes = res.data.data.filter(
          (note: any) => note.isArchived === true && note.isDeleted === false
        );
      },
      error: (err) => {
        console.error('Failed to fetch archived notes', err);
      },
    });
  }

  handleUnarchive(noteId: string) {
    this.loadArchivedNotes(); // Re-fetch after unarchiving
  }

  handleDelete(noteId: string) {
    this.loadArchivedNotes(); // Re-fetch after deleting from archive
  }
}
