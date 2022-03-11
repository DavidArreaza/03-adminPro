import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email : [ 'David@email.com', [ Validators.required, Validators.email] ],
    password : [ '123456', [ Validators.required] ],
    remember: [ false ]
  });

  constructor( private router : Router, private fb : FormBuilder, private usuarioService : UsuarioService) { }

  login(){

    this.usuarioService.loginUsuario( this.loginForm.value )
      .subscribe( resp => {
        console.log(resp)
      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });

    //this.router.navigateByUrl("/"); 

  }

}
