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

  // userMenu: MenuItem[] = [
  //   {text: 'List of all users', link: 'user/list'}
  // ]

  userMenu: MenuItem[] = [
    {text: 'FindAllStudents', link:'not-implemented-yet'},
    {text: 'FindAllTeachers', link:'/'},
    {text: 'FindAllSchedules', link:'/'},
    {text: 'getById', link:'/'},
    {text: 'create', link:'/'},  //create student and create teacher
    {text: 'update', link:'/'},  //update student and teacher
    {text: 'deleteById', link:'/'},   
    {text: 'deleteByUsername', link:'/'},
    {text: 'getUserId', link:'/'},
    
  ] 

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

  teacherMenu: MenuItem[] = [
    
    {text: 'getById', link:'/'},
    {text: 'getByUsername', link:'/'},
    {text: 'create', link:'/'},
    {text: 'update', link:'/'},
    {text: 'deleteById', link:'/'},
    {text: 'deleteByUsername', link:'/'},
    
    
  ]
}
