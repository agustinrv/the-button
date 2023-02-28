import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerRoutingModule } from './timer-routing.module';
import { TimerComponent } from './timer.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {NgChartsModule} from 'ng2-charts';
import {GraficoDeColoresComponent} from '../components/grafico-de-colores/grafico-de-colores.component';
import {StopwatchButtonComponent} from '../components/stopwatch-button/stopwatch-button.component';


@NgModule({
  declarations: [
    TimerComponent,
    StopwatchButtonComponent,
    GraficoDeColoresComponent,
  ],
  imports: [
    CommonModule,
    TimerRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    NgChartsModule,
    MatSidenavModule
  ]
})
export class TimerModule { }
