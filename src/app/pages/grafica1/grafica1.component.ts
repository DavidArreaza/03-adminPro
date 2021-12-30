import { Component, Input, OnInit, Output } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.scss']
})
export class Grafica1Component implements OnInit {

  @Input('Ventas') ventas : string = 'ventas';

  constructor() { }

  ngOnInit(): void {
  }

  lables1 : string[] =  [ 'Pan', 'Agua', 'Pipas' ];

  data1: ChartData<'doughnut'> = {
    labels: this.lables1,
    datasets: [
      { data: [ 50, 100, 200 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        //hoverBackgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      }
    ]
  };
}
