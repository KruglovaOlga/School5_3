import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAPIList } from './user.interfaces';


const USER_API = "http://localhost:3000/api/user" 
//const TEACHER_API = "http://localhost:3000/api/teacher"

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<UserAPIList>(`${USER_API}/findAll`)
  }
  
  // findAll(){
  //   return this.http.get<UserAPIList>(`${TEACHER_API}/findAll`)
  // }
}
