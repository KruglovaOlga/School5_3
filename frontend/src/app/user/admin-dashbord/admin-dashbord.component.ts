import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItem } from '../user.interfaces';
import { UserModule } from '../user.module';


@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.css']
})
export class AdminDashbordComponent {
  title = 'Admin Dashboard'
    usersMenu: MenuItem[] = [
      {text: 'FindAll', link:'user/list'},
      
      {text: 'getById', link:'/'},
      {text: 'create', link:'/'},  
      {text: 'update', link:'/'},  
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

const routes :Routes = [
  {path:'admin-dashboard' , component:AdminDashbordComponent},

]

