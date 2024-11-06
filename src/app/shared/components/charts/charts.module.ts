import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { GraficoEchartsComponent } from './grafico-echarts/grafico-echarts.component';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    GraficoEchartsComponent
  ],  
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({ echarts }),
    FormsModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  exports: [
    GraficoEchartsComponent
  ]
})
export class ChartsModule { }
