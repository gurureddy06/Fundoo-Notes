import { Component, HostListener } from '@angular/core'; // Already partially imported
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  showFiller = false;
  viewType = 'grid';
  viewHover = false;
  refreshHover = false;
  settingsHover = false;
  selectedItem: string = '';

  // 👇 Add these for the avatar dropdown
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    console.log('User logged out');
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-menu')) {
      this.isDropdownOpen = false;
    }
  }

  constructor(private viewService: ViewTypeService) {}

  viewHoverChange(value: boolean) {
    this.viewHover = value;
  }
  refreshHoverChange(value: boolean) {
    this.refreshHover = value;
  }
  settingsHoverChange(value: boolean) {
    this.settingsHover = value;
  }
  toggleviewType() {
    console.log('clicked on the view', this.viewType);
    if (this.viewType === 'grid') {
      this.viewType = 'list';
      this.viewService.setViewType('list');
    } else {
      this.viewType = 'grid';
      this.viewService.setViewType('grid');
    }
  }
  onItemSelected(item: string) {
    this.selectedItem = item;
    console.log('Selected item:', item);
  }
  onFillerStateChanged(state: boolean) {
    this.showFiller = state;
  }
}
