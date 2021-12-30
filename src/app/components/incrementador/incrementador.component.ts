import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.scss']
})
export class IncrementadorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  @Input('valor') progreso : number = 50;
  @Input() btnClass : string = 'btn-primary';

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  /**
   * 
   * @param valor 
   */
  cambiarValor( valor : number ){

    if(this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      this.progreso = 100;
      valor = 0;
    }

    if(this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      this.progreso = 0;
      valor = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit( this.progreso );
  }

  /**
   * 
   * @param event 
   */
  onChange( event : number){

    if( event >= 100 ){
      this.progreso = 100;
    }else if( event < 0){
      this.progreso = 0;
    }

    this.valorSalida.emit(this.progreso);

  }

}
