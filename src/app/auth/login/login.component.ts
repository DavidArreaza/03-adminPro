import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

//declare const google : any;
declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  public auth2 : any;

  public loginForm = this.fb.group({
    email : [ localStorage.getItem('email') || '', [ Validators.required, Validators.email] ],
    password : [ '', [ Validators.required] ],
    remember: [ false ]
  });

  constructor( private router : Router, private fb : FormBuilder, private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){

    this.usuarioService.loginUsuario( this.loginForm.value )
      .subscribe( resp => {
        
        if( this.loginForm.get('remember')?.value ){
          localStorage.setItem('email', this.loginForm.get('email')?.value); // Guarda el email en localStorage
        } else {
          localStorage.removeItem('email'); // No lo guarda en localStorage
        }

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });

    //this.router.navigateByUrl("/"); 
  }

  onSuccess( googleUser : any) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }

  onFailure( error : any) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'type': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'outline',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () =>{
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2;
      this.auth2 = gapi.auth2.init({
        client_id: '597752500350-rbgsh2li8ujs7almqbko67pvbs3ja1qr.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });

      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element : any) {
    this.auth2.attachClickHandler(element, {},
        (googleUser : any) => {
          const token = googleUser.getAuthResponse().id_token;
          //console.log(id_token)
          this.usuarioService.loginGoogle(token).subscribe();

          //TODO: mover al dashborad
        }, (error : any) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }


}
