import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';


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

  private mapHospitales( resultados : any[] ): Hospital[]{
    return resultados.map(hospital => new Hospital( hospital._id, hospital.nombre, hospital.image, hospital.usuario));
  }

  private mapMedicos( resultados : any[] ): Medico[]{
    return resultados.map(hospital => new Medico( hospital._id, hospital.nombre, hospital.image, hospital.usuario));
  }

  /**
   * Busqueda global
   * @param tipo 
   * @param valor 
   * @returns 
   */
  search( tipo : 'usuarios'|'medicos'|'hospitales', valor : string ){
    return this.http.get(
      `${ base_url }/all/coleccion/${ tipo }/${ valor }`, this.headers).pipe(
        map ( (resp : any) => {
          switch ( tipo ) {
            case 'usuarios':
              return this.mapUsuarios( resp.resultados );
                          
            case 'hospitales':
              return this.mapHospitales( resp.resultados );
                            
            case 'medicos':
                 return this.mapMedicos( resp.resultados );

            default:
              return [];
          }
        })
      );
  }

}
