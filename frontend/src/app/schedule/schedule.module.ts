import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http'
import { ScheduleService } from './schedule.service';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleInsertComponent } from './schedule-insert/schedule-insert.component';

const routes: Routes = [
  { path: 'schedule', component: ScheduleListComponent},
  { path: 'insert-schedule', component: ScheduleInsertComponent},
]



@NgModule({
  declarations: [
    ScheduleListComponent,
    ScheduleInsertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    
  ],
  providers:[ScheduleService]
})
export class ScheduleModule { }
