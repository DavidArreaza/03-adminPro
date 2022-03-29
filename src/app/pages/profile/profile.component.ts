import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {


  public perfilForm : FormGroup;
  public usuario : any;
  public imagen : any;
  public imgTemp : any = '';

  constructor( private fb : FormBuilder, private usuarioService : UsuarioService, 
              private fileUpdateService : FileUploadService ) { 

    this.usuario = usuarioService.usuario;
    
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, [ Validators.required] ], 
      email: [ this.usuario.email, [ Validators.required] ]
    });

  }

  ngOnInit(): void {
  }

  updatePerfil(){

    this.usuarioService.updateUsuario(this.perfilForm.value).subscribe( resp => {

      const { nombre ,email} = this.perfilForm.value
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Cambios guardados', 'success');
    }, (err) => {

      Swal.fire('Error', err.error.msg, 'error');

    });
    
  }


  getFile( event : any ){
    this.imagen = event.target.files[0];
    
    if( !this.imagen ){ 
      return this.imgTemp = null; 
    }

    const reader = new FileReader();
    reader.readAsDataURL( this.imagen );

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }

    return true;

  }

  updateFile(){
    this.fileUpdateService.actualizarImagen(this.imagen, 'usuarios', this.usuario.uid)
    .then( img => {

      this.usuario.image = img;
      Swal.fire('Guardado', 'Cambios guardados', 'success');

    }, (err) => {

      Swal.fire('Error', 'No se puedo cargar la imagen', 'error');

    });
  }

}
