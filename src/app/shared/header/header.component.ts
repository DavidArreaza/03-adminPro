import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  public usuario;

  constructor( private usuarioService : UsuarioService, private router : Router ) { 
    this.usuario = this.usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }

  buscar(termino : string){

    if(termino.length === 0){
      this.router.navigateByUrl(`/dashboard`)
    }else{
      this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
    }

    console.log(termino)
  }

}
