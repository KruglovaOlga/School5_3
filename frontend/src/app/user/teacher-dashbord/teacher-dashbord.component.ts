import { Component } from '@angular/core';
import { MenuItem } from '../user.interfaces';

@Component({
  selector: 'app-teacher-dashbord',
  templateUrl: './teacher-dashbord.component.html',
  styleUrls: ['./teacher-dashbord.component.css']
})
export class TeacherDashbordComponent {
  teacherMenu: MenuItem[] = [
    
    {text: 'getById', link:'/'},
    {text: 'getByUsername', link:'/'},
    {text: 'create', link:'/'},
    {text: 'update', link:'/'},
    {text: 'deleteById', link:'/'},
    {text: 'deleteByUsername', link:'/'},
    
    
  ]

}
