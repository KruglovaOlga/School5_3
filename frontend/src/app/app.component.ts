//Decorator
import { Component } from '@angular/core';
import { MenuItem } from './user/user.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'School';

  userMenu: MenuItem[] = [
    {text: 'List of all users', link: 'user/list'}
  ]
}
