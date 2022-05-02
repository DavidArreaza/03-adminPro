import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor( private http : HttpClient, private router : Router) { }


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

  getAllMedicos(){
    return this.http.get<{ ok: boolean, medicos: Medico[] }>(`${ base_url }/medicos`, this.headers).pipe(
      map(
        (resp : { ok: boolean, medicos: Medico[] }) => resp.medicos
      )
    );
  }

  getMedicoByid( id : string ){
    return this.http.get<{ ok: boolean, medico: Medico }>(`${ base_url }/medicos/${ id }`, this.headers).pipe(
      map(
        (resp : { ok: boolean, medico: Medico }) =>  resp.medico
      )
    );
  }

  crearMedico( medico : {nombre : string, hospital : string}){
    return this.http.post(`${ base_url }/medicos`,  medico,  this.headers);
  }

  updateMedico( medico : Medico ){
    return this.http.put(`${ base_url }/medicos/${ medico._id }`, medico,  this.headers);
  }

  deleteMedico( id : string){
    return this.http.delete(`${ base_url }/medicos/${ id }`, this.headers);
  }

}
