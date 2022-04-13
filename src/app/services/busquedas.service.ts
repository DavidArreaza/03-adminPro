import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http : HttpClient) {}


  get token() : string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private mapUsuarios( resultados : any[] ): Usuario[]{
    return resultados.map(user => new Usuario( user.uid, user.nombre, user.email, '', user.image, user.rol, user.google));
  }

  /**
   * Busqueda global
   * @param tipo 
   * @param valor 
   * @returns 
   */
  search( tipo : 'usuarios'|'medicos'|'hospitales', valor : string ){
    return this.http.get(`${ base_url }/all/coleccion/${ tipo }/${ valor }`, this.headers)
                      .pipe(
                        map ( (resp : any) => {

                          switch ( tipo ) {
                            case 'usuarios':
                              return this.mapUsuarios( resp.resultados );
                          
                            default:
                              return [];
                          }
                        }));
  }

}
