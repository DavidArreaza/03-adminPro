import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginForm } from '../interfaces/login-form.interface';
import { registerForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

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
    
    return this.http.post(`${ base_url }/usuarios`, formData);

  }


  /**
   * 
   * @param formData 
   * @returns 
   */
  loginUsuario( formData : loginForm ){
    
    return this.http.post(`${ base_url }/login`, formData);

  }

}
