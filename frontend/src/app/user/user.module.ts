import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http'
import { UserService } from './user.service';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { StudentDashbordComponent } from './student-dashbord/student-dashbord.component';
import { TeacherDashbordComponent } from './teacher-dashbord/teacher-dashbord.component';
import { MenuItem } from './user.interfaces';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: 'list', component: UsersListComponent},
  { path: 'admin', component: AdminDashbordComponent},
  { path: 'student', component: StudentDashbordComponent},
  { path: 'teacher', component: TeacherDashbordComponent}
]

export class UserComponent {
  title = 'Users';

  studentsMenu:MenuItem[]=[
     
    {text: 'getById', link:'not-implemented-yet'},
    {text: 'getByUsername', link:'not-implemented-yet'},
    {text: 'create', link:'not-implemented-yet'},
    {text: 'update', link:'not-implemented-yet'},
    {text: 'deleteById', link:'not-implemented-yet'},
    {text: 'deleteByUsername', link:'not-implemented-yet'},
    {text: 'findInstallmentsByUsername', link:'not-implemented-yet'},
    {text: 'getAllGrades', link:'not-implemented-yet'},
    {text: 'getGradesBySemester', link:'not-implemented-yet'},
    {text: 'findStudentsByGroup', link:'not-implemented-yet'},
  ]

  teachersMenu:MenuItem[] = [
    {text: 'getById', link:'/'},
    {text: 'getByUsername', link:'/'},
    {text: 'create', link:'/'},
    {text: 'update', link:'/'},
    {text: 'deleteById', link:'/'},
    {text: 'deleteByUsername', link:'/'},
  ]
  
}

@NgModule({
  declarations: [
    AdminDashbordComponent,
    StudentDashbordComponent,
    TeacherDashbordComponent,
    UsersListComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers:[UserService]
})
export class UserModule { }
