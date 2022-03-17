import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login-form.interface';
import { registerForm } from '../interfaces/register-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi : any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2 : any;
  public usuario : Usuario | undefined ;

  constructor( private http : HttpClient ,private router : Router, private ngZone : NgZone ) { 

    this.googleInit();

  }

  /**
   * Valida si existe un token
   * @returns 
   */
  validarToken() : Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, { 
      headers:{
        'x-token': token
      }
     }).pipe(
          tap( (resp : any) => {

            const {nombre, email,google, image,  rol, uid} = resp.usuarioDB; 

            this.usuario = new Usuario( uid, nombre, email, '', image, rol, google );
            localStorage.setItem('token', resp.token)

            return true;

          }),
          catchError( error =>  of(false)) // Si no logra hacer la autenticación
      );
  }

  /**
   * 
   * @param formData 
   * @returns información del backend
   */
  crearUsuario( formData : registerForm ){
    
    return this.http.post(`${ base_url }/usuarios`, formData)
                      .pipe( tap( ( resp : any ) => {
                        localStorage.setItem('token', resp.token); //Guarda el token en localStorage
                      }) );

  }

  /**
   * Login Usuario
   * @param formData 
   * @returns 
   */
  loginUsuario( formData : loginForm ){
    
    return this.http.post(`${ base_url }/login`, formData)
                        .pipe( tap( ( resp : any ) => {
                          localStorage.setItem('token', resp.token);
                        }) );

  }

  /**
   * Login Usuario con Google
   * @param token de Google
   * @returns 
   */
  loginGoogle(token : string){
    return this.http.post(`${ base_url }/login/google`, { token })
                        .pipe( tap( ( resp : any ) => {
                          localStorage.setItem('token', resp.token);
                        }) );
  }


  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {

      this.ngZone.run(() => { 
        this.router.navigateByUrl('/login');
      });
      
    });

  }

  googleInit() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '597752500350-rbgsh2li8ujs7almqbko67pvbs3ja1qr.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
    });
  };

}
