import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserTime} from '../model/user-time';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {

  private estadisticas= [
    {cantClicks: 40, time: "60s-52s", color: "Purple"},
    {cantClicks: 30, time: "51s-42s", color: "Blue"},
    {cantClicks: 15, time: "41s-32s", color: "Green"},
    {cantClicks: 10, time: "31s-22s", color: "Yellow"},
    {cantClicks: 5, time: "21s-12s", color: "Orange"},
    {cantClicks: 3, time: "11s-0s", color: "Red"},
    {cantClicks: 10, time: "No hizo click", color: "Grey"},
    {cantClicks: 15, time: "Click no habilitado", color: "White"},
  ];

  private usersTime$ = new BehaviorSubject<UserTime[]>([]);

  public names:string[]=[];

  constructor(private http:HttpClient) { 
    this.generateUsersTime();
  }

  addTime(time:any){
    this.usersTime$.subscribe(() => {
      const usersTime = this.usersTime$.getValue();
      this.usersTime$.next([...usersTime, time]);
    });
  }

  addStatistics(color:string)
  {
      for (const i of this.estadisticas) {
          if(i.color==color)
          {
            i.cantClicks++;
            break;
          }
      }
  }

  getEstadisticas(){
      return this.estadisticas;
  }

  getTimesUsers()
  {
      return this.usersTime$;
  }

  private generateUsersTime(){
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((data:any)=>{
      let names:string[];
      names = data.map((element:any)=>{
        return element.name;
      });
      
      let listUserTime:UserTime[]=[];
      this.names=names.slice(5,names.length);
      names.splice(0,5);
    

      for (let name of names) {

          let _time=Math.floor(Math.random() * (60) + 1)
          let aux:UserTime={
            name:name,
            time:_time,
            color:this.getColor(_time)
          };

          listUserTime.push(aux);
      }

      this.usersTime$.next(listUserTime);
   });
  }


  public getColor(time:number):string{
      
      let color:string="";

      if(time<=60 && time>=52){
        color='purple';
      }
      else if(time<=51 && time>=42){
        color='blue';
      }
      else if(time<=41 && time>=32){
        color='green';
      }
      else if(time<=31 && time>=22){
        color='yellow';
      }
      else if(time<=21 && time>=12){
        color='orange';
      }
      else if(time<=11 && time>=0){
        color='red';
      }

      return color;
  }

  getName(){


      let i=Math.floor(Math.random() * (this.names.length-1) + 0)
      return this.names[i];
  }


}
