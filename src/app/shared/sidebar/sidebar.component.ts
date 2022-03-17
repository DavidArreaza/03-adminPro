import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario;

  constructor( private sidebarSetting : SidebarService, private usuarioService : UsuarioService ) { 
    this.menuItems = sidebarSetting.menu;
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
