import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { ThemeService } from 'ng2-charts';
import { TimeMark } from 'src/app/model/time-mark';

@Component({
  selector: 'grafico-de-colores',
  templateUrl: './grafico-de-colores.component.html',
  styleUrls: ['./grafico-de-colores.component.scss'],
})
export class GraficoDeColoresComponent implements OnInit {
  @Input() timeMarks: TimeMark[] = [];
  public data!: ChartData<'doughnut'>;
  public labels: string[] = ['Purpura','Azul','Verde','Amarillo','Naranja','Rojo','Gris','Blanco'];

  constructor(private themeService: ThemeService) {
    let colors:any = {backgroundColor: ['purple','blue','green','yellow','orange','red','grey','white',],color: 'black',};
    // backgroundColor: Seteo de q color sera cada marca de tiempo en el grafico
    //color:color de letra

    this.themeService.setColorschemesOptions(colors);
  }

  ngOnInit(): void {
    this.actualizarValores();
  }

  ngOnChanges() {
    this.actualizarValores();
  }

  actualizarValores() {
    let listCantClicks = this.timeMarks.map((element) => {
      return element.cantClicks;
    });
    //Cargo los datos del grafico y los labels
    this.data = {
      labels: this.labels,
      datasets: [{ data: listCantClicks }],
    };
  }
}
