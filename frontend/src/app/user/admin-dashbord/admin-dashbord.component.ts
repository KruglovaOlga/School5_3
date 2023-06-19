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
    usersMenu: MenuItem[] = [
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
    
  }

const routes :Routes = [
  {path:'admin-dashboard' , component:AdminDashbordComponent},

]

