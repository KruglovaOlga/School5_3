import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAPIList, StudentAPIList, User } from './user.interfaces';


const USER_API = "http://localhost:3000/api/user" 
const STUDENT_API = "http://localhost:3000/api/student" 
//const TEACHER_API = "http://localhost:3000/api/teacher"

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<UserAPIList>(`${USER_API}/findAll`)
  }

  findAll_Students(){
    return this.http.get<StudentAPIList>(`${STUDENT_API}/findAll`)
  }

  insertUser(user: User){
     return this.http.post<UserAPIList>(`${USER_API}/create`, user)
  }
  
  // findAll(){
  //   return this.http.get<UserAPIList>(`${TEACHER_API}/findAll`)
  // }

   // get user by username
  //  getUserByUsername(username: string): Observable<any> {
  //   return this.http.get(`/api/users/${username}`);
  // }
}
