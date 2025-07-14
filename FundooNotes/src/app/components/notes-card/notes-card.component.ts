import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from 'src/app/services/notes_services/notes.service';

@Component({
  selector: 'app-notes-card',
  templateUrl: './notes-card.component.html',
  styleUrls: ['./notes-card.component.css'],
})
export class NotesCardComponent implements OnInit {
  @Input() title: any;
  @Input() description: any;
  @Input() viewType: any;
  @Input() color: any;
  @Input() isArchived: any;
  @Input() isDeleted: any;
  @Input() _id: any;

  @Output() archiveNote = new EventEmitter<string>();
  @Output() noteDeleted = new EventEmitter<string>();

  myForm: FormGroup;
  archive = false;
  glowIcons = 0;
  selectedColor = '#ffffff';
  showPalletModal = false;

  noteColors = [
    { name: 'Default', value: '#ffffff' },
    { name: 'Red', value: '#f28b82' },
    { name: 'Orange', value: '#fbbc04' },
    { name: 'Yellow', value: '#fff475' },
    { name: 'Green', value: '#ccff90' },
    { name: 'Teal', value: '#a7ffeb' },
    { name: 'Blue', value: '#cbf0f8' },
    { name: 'Dark Blue', value: '#aecbfa' },
    { name: 'Purple', value: '#d7aefb' },
    { name: 'Pink', value: '#fdcfe8' },
    { name: 'Brown', value: '#e6c9a8' },
    { name: 'Gray', value: '#e8eaed' },
  ];

  constructor(private fb: FormBuilder, private notesApi: NotesService) {
    this.myForm = fb.group({
      color: [''],
    });
  }

  ngOnInit() {
    this.selectedColor = this.color || '#ffffff';
  }

  selectArchive() {
    this.archive = !this.archive;
    const data = {
      noteIdList: [String(this._id)],
      isArchived: !this.isArchived,
    };
    this.notesApi.archiveNotes(data).subscribe({
      next: (val) => {
        console.log('Archive/unarchive response:', val);
        this.archiveNote.emit(this._id);
      },
      error: (err) => console.error('Archive error:', err),
    });
  }

  deleteNote() {
    const data = {
      noteIdList: [String(this._id)],
      isDeleted: true,
    };
    this.notesApi.deleteNotes(data).subscribe({
      next: (res) => {
        console.log('Note moved to bin:', res);
        this.noteDeleted.emit(this._id);
      },
      error: (err) => console.error('Error moving note to bin:', err),
    });
  }

  togglePalletModal() {
    this.showPalletModal = !this.showPalletModal;
  }

  selectColor(value: string) {
    this.selectedColor = value;
    this.myForm.get('color')?.setValue(value);

    const data = {
      noteIdList: [String(this._id)],
      color: value,
    };

    this.notesApi.updateColorNotes(data).subscribe({
      next: (res) => {
        console.log('Color updated:', res);
      },
      error: (err) => {
        console.error('Failed to update color:', err);
      },
    });
  }

  onMouseLeave() {
    this.glowIcons = 0;
  }

  onMouseEnter() {
    this.glowIcons = 1;
  }
}
