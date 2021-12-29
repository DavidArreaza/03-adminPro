import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  progreso : number = 50;

  get getProcentaje(){
    return `${ this.progreso }%`;
  }

  cambiarValor( valor : number ){

    if(this.progreso >= 100 && valor >= 0){
      this.progreso = 100;
      valor = 0;
    }

    if(this.progreso <= 0 && valor < 0){
      this.progreso = 0;
      valor = 0;
    }

    this.progreso = this.progreso + valor;
  }

}
