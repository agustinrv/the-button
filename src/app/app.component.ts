import { StopwatchService } from './services/stopwatch.service';
import { Component, OnInit } from '@angular/core';
import {TimeMark} from './model/time-mark';
import {share} from 'rxjs';
import {UserTime} from './model/user-time';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  public timeMarks:TimeMark[]=[];
  public jugo:boolean;
  displayedColumns: string[] = ['name', 'time','color'];
  private names:string[]=[];

  public timeMarksUsers:UserTime[]=[];

  public constructor(private stopwatchService:StopwatchService)
  {
    this.jugo=(localStorage.getItem("jugo")==="true");
    

  }

  ngOnInit(): void {
      this.timeMarks=this.stopwatchService.getEstadisticas();

      this.stopwatchService.getTimesUsers().pipe(share()).subscribe((data:UserTime[])=>{
        this.timeMarksUsers=data;

        
        this.timeMarksUsers=this.timeMarksUsers.slice(0,5);
        if(this.jugo){
          let userTime:UserTime=JSON.parse(localStorage.getItem("userTime")!);

          this.timeMarksUsers.push(userTime);
          this.timeMarksUsers=this.timeMarksUsers.slice(1,6);
        }
      });

      

  }

  public addTime(userTime:UserTime){
    this.timeMarksUsers.unshift(userTime);
    this.timeMarksUsers=this.timeMarksUsers.slice(0,5);
    this.timeMarksUsers=[...this.timeMarksUsers];

    
    this.stopwatchService.addStatistics(userTime.color);
    this.timeMarks=this.stopwatchService.getEstadisticas();
    this.timeMarks=[...this.timeMarks];
  }



 
  
}
