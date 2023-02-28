import { Component, OnInit } from '@angular/core';
import { share } from 'rxjs';
import { TimeMark } from 'src/app/model/time-mark';
import { UserTime } from 'src/app/model/user-time';
import { StopwatchService } from 'src/app/services/stopwatch.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  public timeMarks: TimeMark[] = [];
  public jugo: boolean;
  displayedColumns: string[] = ['name', 'time', 'color'];
  private names: string[] = [];

  public timeMarksUsers: UserTime[] = [];

  public constructor(private stopwatchService: StopwatchService) {
    this.jugo = localStorage.getItem('jugo') === 'true';
  }

  ngOnInit(): void {
    this.timeMarks = this.stopwatchService.getStatistics();

    this.stopwatchService.getTimesUsers().pipe(share()).subscribe((data: UserTime[]) => {
        this.timeMarksUsers = data;

        this.timeMarksUsers = this.timeMarksUsers.slice(0, 5);
        if (this.jugo) {
          let userTime: UserTime = JSON.parse(
            localStorage.getItem('userTime')!
          );

          this.timeMarksUsers.push(userTime);
          this.timeMarksUsers = this.timeMarksUsers.slice(1, 6);
        }
      });
  }

  public addTime(userTime: UserTime) {
    this.addTimeTable(userTime);
    this.stopwatchService.addStatistics(userTime.color);
    this.timeMarks = this.stopwatchService.getStatistics();

    this.timeMarks = [...this.timeMarks];
  }

  addTimeTable(userTime: UserTime) {
    this.timeMarksUsers.unshift(userTime);
    this.timeMarksUsers = this.timeMarksUsers.slice(0, 5);
    this.timeMarksUsers = [...this.timeMarksUsers];
  }
}
