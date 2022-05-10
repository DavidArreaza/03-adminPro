import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login-form.interface';
import { registerForm } from '../interfaces/register-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargar-usuaios.interface';

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

  get token() : string {
    return localStorage.getItem('token') || '';
  }

  get uid() : string {
    return this.usuario?.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  get rol() : string{
    return this.usuario?.rol || '';
  }

  guardarLocalStorage( token : string, menu : any ){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  /**
   * Valida si existe un token
   * @returns 
   */
  validarToken() : Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, this.headers)
      .pipe(
          map( (resp : any) => {

            const {nombre, email, google, image,  rol, uid} = resp.usuarioDB; 

            this.usuario = new Usuario( uid, nombre, email, '', image, rol, google );

            this.guardarLocalStorage(resp.token, resp.menu);

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
                        this.guardarLocalStorage(resp.token, resp.menu);
                      }) );

  }


  /**
   * Actualizar usuario
   * @param data 
   * @returns 
   */
  updateUsuario ( data: {email : string, nombre : string, rol : string}){

    data = {
      ...data,
      rol: this.usuario?.rol || ''
    }

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers)
  }

  /**
   * Login Usuario
   * @param formData 
   * @returns 
   */
  loginUsuario( formData : loginForm ){
    
    return this.http.post(`${ base_url }/login`, formData).pipe(
      tap( ( resp : any ) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      }) );

  }

  /**
   * Login Usuario con Google
   * @param token de Google
   * @returns 
   */
  loginGoogle(token : string){
    return this.http.post(`${ base_url }/login/google`, { token }).pipe(
      tap( ( resp : any ) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      }) );
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

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


  /**
   * Muestra una lista de usuarios
   * @param cantidadMostrar 
   * @returns 
   */
  getAllUsuarios( cantidadMostrar : number = 0 ){
    return this.http.get<CargarUsuarios>(`${ base_url }/usuarios?view=${ cantidadMostrar }`, this.headers)
                      .pipe(
                        map( resp => {

                          const usuarios = resp.usuarios.map( 
                            user => new Usuario( user.uid, user.nombre, user.email, '', user.image, user.rol, user.google)
                          ) 
                          return {
                            total: resp.total, 
                            usuarios
                          };
                        })
                      )
  }

  /**
   * Elimina un usuario
   * @param usuario 
   * @returns 
   */
  deleteUsuario( usuario : Usuario ){
    return this.http.delete(`${ base_url }/usuarios/${usuario.uid}`, this.headers);
  }


  /**
   * Actualiza el Rol de un usuario
   */
  updateRol ( usuario : Usuario){
    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers)
  }

}
