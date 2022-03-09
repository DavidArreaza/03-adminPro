import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  });

  constructor( private fb : FormBuilder) { }

  crearUsuario(){
    this.formSubmitted = true;
    console.log( this.registerForm.value );
  }

  campoNoValido(campo : string): boolean{
    
    if( this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
    
  }

}
