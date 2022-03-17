import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  public usuario;

  constructor( private usuarioService : UsuarioService ) { 
    this.usuario = this.usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }

}
