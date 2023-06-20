import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserAPIList } from '../user.interfaces';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  constructor(private userService: UserService){}

  userList: User[]= []

  ngOnInit(): void {
    console.log('Starting findAll API call'  )
    this.userService.findAll().subscribe({
      next: (apiData: UserAPIList) =>{
        const {status, data} = apiData;
        this.userList = data;
        console.log(status,data)
      },
      error: (error) => {console.log(error)},
      complete: () => {
        console.log('API call complited')
      }})
  }

}
