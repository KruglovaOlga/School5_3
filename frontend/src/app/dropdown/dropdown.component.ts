import { Component, Input } from '@angular/core';
import { MenuItem } from '../user/user.interfaces';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() items: MenuItem[] = [{ text: 'sample text', link: 'sample-link'}]
  @Input() dropdownLabel = 'Dropdown'
}
