import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios : Usuario[] = []
  public medicos : Medico[] = []
  public hospitales : Hospital[] = []

  constructor(private activateRoute : ActivatedRoute, private router : Router, private busquedaService : BusquedasService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({termino}) => { this.buscar(termino); })
  }

  buscar( termino : string){
    this.busquedaService.searchAll(termino).subscribe( (resp : any) => {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
      console.log(resp)
    })
  }

}
