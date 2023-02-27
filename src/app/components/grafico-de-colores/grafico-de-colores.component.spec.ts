import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDeColoresComponent } from './grafico-de-colores.component';

describe('GraficoDeColoresComponent', () => {
  let component: GraficoDeColoresComponent;
  let fixture: ComponentFixture<GraficoDeColoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoDeColoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoDeColoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
