import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Schedule, ScheduleAPIList } from '../schedule.interface';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit{
  constructor(private scheduleService: ScheduleService){}

  scheduleList: Schedule[] = []

  ngOnInit(): void {
    console.log('Starting findAll API call'  )
    this.scheduleService.findAll().subscribe({
      next: (apiData: ScheduleAPIList) =>{
        const {status, data} = apiData;
        this.scheduleList = data;
        console.log(status,data)
      },
      error: (error) => {console.log(error)},
      complete: () => {
        console.log('API call complited')
      }})
  }

}
