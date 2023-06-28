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
import { UserInsertComponent } from './user-insert/user-insert.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  { path: 'list-users', component: UsersListComponent},
  { path: 'insert-users', component: UserInsertComponent},
  { path: 'update-users/:username', component: UserUpdateComponent},
  { path: 'delete-user', component: UserDeleteComponent},
  { path: 'list-students', component: StudentListComponent},
  { path: 'admin', component: AdminDashbordComponent},
  { path: 'student', component: StudentDashbordComponent},
  { path: 'teacher', component: TeacherDashbordComponent}
]

export class UserComponent {
  title = 'Users';

 
  
}

@NgModule({
  declarations: [
    AdminDashbordComponent,
    StudentDashbordComponent,
    TeacherDashbordComponent,
    UsersListComponent,
    UserInsertComponent,
    DropdownComponent,
    StudentListComponent,
    UserDeleteComponent,
    UserUpdateComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers:[UserService],
  exports:[UsersListComponent],
})
export class UserModule { }
