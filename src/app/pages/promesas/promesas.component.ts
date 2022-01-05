import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.scss']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise( ( resolve, reject ) =>{

    //   if(false){
    //     resolve("HOLA PROMESA");
    //   }else{
    //     reject('FALLÓ');
    //   }

    // } );

    // //Esto es lo que se ejecuta cuando la promesa se resuelve
    // promesa.then( ( mensaje ) =>{ 
    //   console.log( mensaje ) //Imprime lo que hay dentro de la promesa
    // }).catch( error => {
    //   console.log("ERROR CAPTURADO");
    // })
    
    //this.getUsuarios();

    this.getUsuarios().then(usuarios => {
      console.log(usuarios)
    });

  }

  getUsuarios(){

    //VARIAS FORMAS
    //Lo reconoce ya como Promise
    // fetch('https://reqres.in/api/users').then( respuesta  => {
      //Esto devuelve otra Promise
      // respuesta.json().then( body => {
      //   console.log(body);
      // })
    // })

    const promesa = new Promise ( resolve => {
      fetch('https://reqres.in/api/users').then( resp => resp.json() ).then( body => resolve( body.data ));
    });
    
    return promesa;

  }

}
