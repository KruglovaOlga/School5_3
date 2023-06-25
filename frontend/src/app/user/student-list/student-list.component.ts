import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Student, StudentAPIList } from '../user.interfaces';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  constructor(private userService: UserService){}
  
  studentList: Student[]= []

  ngOnInit(): void {
    console.log('Starting findAll API call'  )
    this.userService.findAll_Students().subscribe({
      next: (apiData: StudentAPIList) =>{
        const {status, data} = apiData;
        this.studentList = data;
        console.log(status,data)
      },
      error: (error) => {console.log(error)},
      complete: () => {
        console.log('API call complited')
      }})
  }
}
