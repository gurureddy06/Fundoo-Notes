import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes_services/notes.service';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';

@Component({
  selector: 'app-cardcontainer',
  templateUrl: './cardcontainer.component.html',
  styleUrls: ['./cardcontainer.component.css'],
})
export class CardcontainerComponent implements OnInit {
  userNotes: any[] = [];
  pinedNotes: any[] = [];
  nonPinedNotes: any[] = [];
  viewType: string = 'grid';

  constructor(
    private notesApi: NotesService,
    private viewTypeservice: ViewTypeService
  ) {}

  ngOnInit(): void {
    this.subscribeViewType();
    this.loadUserNotes();
  }

  private subscribeViewType(): void {
    this.viewTypeservice.viewType$.subscribe((value) => {
      this.viewType = value;
      console.log('value changed using the behaviour subject', value);
    });
  }

  private loadUserNotes(): void {
    this.notesApi.getUserNotes().subscribe({
      next: (res: any) => {
        console.log('getting notes', res);
        const allNotes = res.data.data;

        // Filter: only notes that are not archived and not deleted
        this.userNotes = allNotes.filter(
          (note: any) => !note.isArchived && !note.isDeleted
        );

        // Categorize pinned and non-pinned
        this.pinedNotes = this.userNotes.filter((note: any) => note.isPined);
        this.nonPinedNotes = this.userNotes.filter((note: any) => !note.isPined);
      },
      error: (err) => {
        console.error('Error occurred while getting notes', err);
      },
    });
  }

  removeNote(noteId: string): void {
    this.notesApi.getUserNotes().subscribe({
      next: (res: any) => {
        console.log('After archive/delete fetch:', res.data.data);

        this.userNotes = res.data.data.filter(
          (note: any) => !note.isArchived && !note.isDeleted
        );

        this.pinedNotes = this.userNotes.filter((note: any) => note.isPined);
        this.nonPinedNotes = this.userNotes.filter((note: any) => !note.isPined);
      },
      error: (err) => console.error('Error reloading notes:', err),
    });
  }

  // Optional: This is not used anymore, but kept for reference.
  countPined(): void {
    this.pinedNotes = this.userNotes.filter(
      (note: any) => note.isPined && !note.isArchived && !note.isDeleted
    );

    this.nonPinedNotes = this.userNotes.filter(
      (note: any) => !note.isPined && !note.isArchived && !note.isDeleted
    );
  }
}
