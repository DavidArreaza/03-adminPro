import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login-form.interface';
import { registerForm } from '../interfaces/register-form.interface';
import { tap } from 'rxjs/operators';

const base_url = environment.base_url;

declare const google : any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http : HttpClient ) { }

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
    console.log("TOKEN EN EL SERVICIO", token);
    return this.http.post(`${ base_url }/login/google`, { token })
                        .pipe( tap( ( resp : any ) => {
                          localStorage.setItem('token', resp.token);
                        }) );
  }

}
