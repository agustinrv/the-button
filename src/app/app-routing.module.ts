import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
          {
            path:"",
            redirectTo:"temporizador",
            pathMatch:"full"
          },
          { path: 'temporizador', loadChildren: () => import('./pages/timer/timer.module').then(m => m.TimerModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
