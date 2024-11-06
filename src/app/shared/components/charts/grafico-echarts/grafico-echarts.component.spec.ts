import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoEchartsComponent } from './grafico-echarts.component';

describe('GraficoEchartsComponent', () => {
  let component: GraficoEchartsComponent;
  let fixture: ComponentFixture<GraficoEchartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoEchartsComponent]
    });
    fixture = TestBed.createComponent(GraficoEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
