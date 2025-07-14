import { Component, OnInit } from '@angular/core';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';
import { NotesService } from 'src/app/services/notes_services/notes.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css'],
})
export class BinComponent implements OnInit {
  viewType: string = 'grid'; // Default to grid
  userNotes: any[] = [];
  binNotes: any[] = [];

  constructor(
    private viewTypeService: ViewTypeService,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    // Listen for view type toggle (grid/list)
    this.viewTypeService.viewType$.subscribe((value: string) => {
      this.viewType = value;
    });
    // Fetch all user notes
    this.notesService.getUserNotes().subscribe({
      next: (res: any) => {
        this.userNotes = res.data.data;
        this.filterBinNotes();
      },
      error: (err) => {
        console.error('Failed to load notes:', err);
      },
    });
  }
  
  filterBinNotes() {
    this.binNotes = this.userNotes.filter((note: any) => note.isDeleted === true);
  }
}
