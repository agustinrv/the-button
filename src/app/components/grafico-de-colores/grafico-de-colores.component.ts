import { Component, Input, OnInit } from '@angular/core';
import {ChartData,ChartType} from 'chart.js';
import {ThemeService} from 'ng2-charts';
import {TimeMark} from 'src/app/model/time-mark';

@Component({
  selector: 'grafico-de-colores',
  templateUrl: './grafico-de-colores.component.html',
  styleUrls: ['./grafico-de-colores.component.scss']
})
export class GraficoDeColoresComponent implements OnInit{
  
  @Input() timeMarks:TimeMark[]=[];
  public data!: ChartData<'doughnut'>  
  public labels: string[] = ["Purple","Blue","Green","Yellow","Orange","Red","Grey","White"];

  constructor(private themeService: ThemeService) { 
    let colors: any;
    colors ={backgroundColor:["purple","blue","Green","yellow","orange","red","grey","white"],color:"black"};
    this.themeService.setColorschemesOptions(colors);
    // background:Seteo de q color sera cada marca de tiempo en el grafico
    //color:color de letra

    
  }

  ngOnInit(): void {
    
    let listCantClicks= this.timeMarks.map((element)=>{
      return element.cantClicks;
    })
    //Cargo los datos del grafico y los labels
    this.data= {
      labels: this.labels,
      datasets: [
        { data: listCantClicks },
      ]
    };
  }
  


}
