import { Component } from '@angular/core';
import { MenuItem } from '../user.interfaces';

@Component({
  selector: 'app-student-dashbord',
  templateUrl: './student-dashbord.component.html',
  styleUrls: ['./student-dashbord.component.css']
})
export class StudentDashbordComponent {
    studentMenu: MenuItem[] = [
    
    {text: 'getById', link:'/'},
    {text: 'getByUsername', link:'/'},
    {text: 'create', link:'/'},
    {text: 'update', link:'/'},
    {text: 'deleteById', link:'/'},
    {text: 'deleteByUsername', link:'/'},
    {text: 'findInstallmentsByUsername', link:'/'},
    {text: 'getAllGrades', link:'/'},
    {text: 'getGradesBySemester', link:'/'},
    {text: 'findStudentsByGroup', link:'/'},
        
  ]

}
