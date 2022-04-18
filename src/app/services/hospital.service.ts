import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class HospitalService {

  constructor( private http : HttpClient ,private router : Router ) { }


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
  
  
  getAllHospitales(){
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(`${ base_url }/hospitales`, this.headers).pipe(
      map(
        (resp : { ok: boolean, hospitales: Hospital[] }) => resp.hospitales
      )
    );
  }


}


