import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {


  public totalUsuarios : number = 0;
  public usuarios : Usuario[] = [];
  public pagina : number = 0;
  public cargando : boolean = true;

  public imgSubs : Subscription | undefined;

  constructor(private usuarioService : UsuarioService, private busquedaService : BusquedasService,
                private modalService : ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.imgSubs = this.modalService.updateImagen.pipe(
      delay(100)
    ).subscribe(img => this.cargarUsuarios()); // Para cuando se actualiza una imagen
  }

  cargarUsuarios(){

    this.cargando = true;

    this.usuarioService.getAllUsuarios( this.pagina )
    .subscribe( ({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina( valor : number ) {

    this.pagina += valor;

    if( this.pagina < 0 ){
      this.pagina = 0;
    }else if( this.pagina >= this.totalUsuarios ){
      this.pagina -= valor;
    }

    this.cargarUsuarios();

  }


  buscarMedico( valor : string ){

    if(valor.length === 0){
      this.usuarioService.getAllUsuarios( this.pagina )
                          .subscribe( ({ total, usuarios }) => {
                            this.totalUsuarios = total;
                            this.usuarios = usuarios;
                            this.cargando = false;
                          });

      return;
    }

    this.busquedaService.search( 'usuarios', valor).subscribe( (resp : any) => {
      this.usuarios = resp;
    })
    
  }


  deleteUser( usuario : Usuario ){

    // Para no eliminar el usuario propio
    if( usuario.uid === this.usuarioService.uid ){
      Swal.fire('Error', 'No puede eliminar este registro', 'error');
      return;
    }

    Swal.fire({
      title: '¿Eliminar usuario?',
      text: `No podrá recuperar los datos eliminados de ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.deleteUsuario(usuario).subscribe( resp => 
          Swal.fire(
            'Eliminado',
            `${usuario.nombre} ha sido eliminado`,
            'success'
          ) 
        );
        this.cargarUsuarios();
      }
    })
  }

  updateRol( usuario : Usuario) {
    return this.usuarioService.updateRol(usuario).subscribe( resp => {
      console.log(resp);
    })
  }

  abrirModal ( usuario : Usuario ){
    this.modalService.abrirModal('usuarios', usuario.uid, usuario.image);
  }

}
