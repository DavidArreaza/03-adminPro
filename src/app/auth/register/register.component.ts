import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre : [ 'David', [ Validators.required] ],
    email : [ 'David@email.com', [ Validators.required, Validators.email] ],
    password : [ '123456', [ Validators.required] ],
    passwordConfirmed : [ '123456', [ Validators.required] ],
    terminos : [ true, Validators.required ]
  }, {
    validators: this.passwordIguales('password', 'passwordConfirmed')
  });

  constructor( private fb : FormBuilder, private usuarioService : UsuarioService) { }

  /**
   * Crea el usuario en BBDD
   * @returns 
   */
  registrarUsuario(){
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if( this.registerForm.invalid ){
      return;
    }

    // Si es valido el formulario
    this.usuarioService.crearUsuario( this.registerForm.value ).subscribe(res => {
      console.log(res)
      console.log("USUARIO CREADO");
    }, (err) => {
      // Si sucede un error
      Swal.fire('Error', err.error.msg, 'error');
    });

  }

  /**
   * Validar campos
   * @param campo 
   * @returns 
   */
  campoNoValido(campo : string): boolean{
    
    if( this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  /**
   * Validar passwords
   * @returns true si son iguales - false si no son iguales
   */
  validarPassword(){

    const pass1 =  this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('passwordConfirmed')?.value;

    if(pass1 === pass2){
      return false;
    }else{
      return true;
    }

  }

  /**
   * Comprobar chek
   * @returns true si marca check. False no marca check
   */
  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  /**
   * Validar que las passwords sean iguales
   * @param pass1 
   * @param pass2 
   * @returns 
   */
  passwordIguales(pass1: string, pass2: string){

    return ( formGroup : FormGroup ) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

        if( pass1Control?.value === pass2Control?.value ){
          pass2Control?.setErrors(null);
        } else {
          pass2Control?.setErrors({noEsIgual : true});
        }
    }

  }

}
