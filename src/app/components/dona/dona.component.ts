import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.scss']
})
export class DonaComponent implements OnInit {

  @Input() title: string = 'Sin titulo';

  constructor() { }

  ngOnInit(): void {
  }
  // Input para pasar datos del hijo al padre
  @Input('labels') doughnutChartLabels: string[] = [ 'Dato 1', 'Dato 2', 'Dato 3'  ];
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        hoverBackgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      }
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

}
