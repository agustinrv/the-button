import { StopwatchService } from './../../services/stopwatch.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {UserTime} from 'src/app/model/user-time';

@Component({
  selector: 'app-stopwatch-button',
  templateUrl: './stopwatch-button.component.html',
  styleUrls: ['./stopwatch-button.component.scss']
})
export class StopwatchButtonComponent implements OnInit,AfterViewInit {

  public time:number=60;
  private timerInterval:any;
  public colorButton="background-color:#9c27b0";
  public animation="heartbeat bubbly-button";
  public contClick=2;
  @Input() jugo=false;
  @Output() cambioJugo:EventEmitter<any>=new EventEmitter<any>();
  @Output() newUserTime:EventEmitter<any>=new EventEmitter<any>();

  constructor(private stopwatchService:StopwatchService) { }

  ngOnInit(): void {
      
  }

  ngAfterViewInit(){
      this.timer();
      this.clickSimulator();
      this.clickSimulator();
     

  }

  private timer()
  { 
    this.timerInterval=setInterval(()=>{
      this.time-=1;
      this.buttonColor();
      if(this.time==0)
      {
        this.stopTimer(); //Detengo el temporizador en 0
      }
    },1000);
    
  }

  public buttonColor(){
   
      switch (this.time) {
        case 60://purple
        case 59:
          this.colorButton="background-color:#9c27b0;color:white";
          break;
        case 51://blue
          this.colorButton="background-color:#3f51b5;color:white";
          break;
        case 41://green
          this.colorButton="background-color:#1fa310;color:white";
          break;
        case 31://yellow
          this.colorButton="background-color:#f1f500;color:black";
          break;
        case 21://orange
          this.colorButton="background-color:#c97520;color:white";
          break;
        case 11://red
          this.colorButton="background-color:#cf2626;color:white";
          break;
        case 0://grey
          this.colorButton="background-color:#626367;color:white";
          break;
      }

  }

  public stopTimer(){
    if(this.contClick==1 || this.time==0)
    {
      this.contClick--;
      clearInterval(this.timerInterval);
      this.animateButton();
      this.jugo=true;
      setTimeout(()=>{
        
        let userTime:UserTime={
            name:"Tu",
            time:this.time,
            color:this.stopwatchService.getColor(this.time)
        }

        this.newUserTime.emit(userTime);
        this.cambioJugo.emit(this.jugo);
        localStorage.setItem("jugo","true");
        localStorage.setItem('userTime',JSON.stringify(userTime));
        this.timer();
        this.time=60;
      },2000);
    }
    else if(!this.jugo){
      this.contClick--;
    }
    
  } 



  private animateButton() {
    
    this.animation="heartbeat bubbly-button animate "
    
    setTimeout(()=>{
      this.animation="disabled";
    },700);
  };

  private clickSimulator()
  {
      let randomTime:number=-1;

      setInterval(()=>{
          randomTime=Math.floor(Math.random() * (this.time + 1) + 0);
          
          if(this.time==randomTime)
          {
            let userTime:UserTime={
              name:this.stopwatchService.getName(),
              time:this.time,
              color:this.stopwatchService.getColor(this.time)
            }
  
            this.newUserTime.emit(userTime);
            this.time=60;
          }
      },1000);


  }

  





}
