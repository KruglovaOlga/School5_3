import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleInsertComponent } from './schedule-insert.component';

describe('ScheduleInsertComponent', () => {
  let component: ScheduleInsertComponent;
  let fixture: ComponentFixture<ScheduleInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
