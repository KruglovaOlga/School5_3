import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduleAPIList } from './schedule.interface';

const SCHEDULE_API = "http://localhost:3000/api/schedule" 


@Injectable()
export class ScheduleService {

  constructor(private http: HttpClient) { }





  

  findAll(){
    return this.http.get<ScheduleAPIList>(`${SCHEDULE_API}/findAll`)
  }
}