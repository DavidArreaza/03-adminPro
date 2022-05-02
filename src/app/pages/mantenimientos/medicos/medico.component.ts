import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medicos.service';

import { Hospital } from 'src/app/models/hospital.model';

import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {


  public medicoForm : FormGroup;
  public hospitales : Hospital[] = [];

  public hospitalSeleccionado : any;
  public medicoSeleccionado : any;

  constructor( private fb : FormBuilder, private hospitalService : HospitalService,
    private medicoService : MedicosService, private router : Router, private activatedRoute : ActivatedRoute ) {

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id }) => { this.cargarMedico(id) }) //Para cargar la información del médico
    this.cargarHospitales(); //Para cargar los hospitales del select

    // Obtiene la información del hospital seleccionado en el box
    this.medicoForm.get('hospital')?.valueChanges.subscribe(
      hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
      }
    )
  }


  /**
  * Crear o actualizar médico
  */
  guardarMedico(){

    if( this.medicoSeleccionado ){
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.updateMedico( data ).subscribe(
        resp => {
          console.log(resp)
          Swal.fire('Médico actualizado', `${this.medicoForm.value.nombre} actualizdo correctamente`, 'success');
        }
      )

    }else{
      //crear
      this.medicoService.crearMedico(this.medicoForm.value.nombre).subscribe(
        (resp : any) => {
          console.log(resp)
          Swal.fire('Médico añadido', `${this.medicoForm.value} añadido correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        }
      )

    }

  }

  /**
   * Carga la lista de hospitales en el box
   */
  cargarHospitales(){
    this.hospitalService.getAllHospitales().subscribe(
      (hospitales: Hospital[]) => {
        this.hospitales = hospitales
      }
    )
  }

  /**
   * Obtiene un solo médico
   * @param id 
   */
  cargarMedico(id : string){

    if( id === 'nuevo' ){
      return
    } 

    this.medicoService.getMedicoByid(id).pipe(
      delay(100)
    ).subscribe(
      resp => {

        if( !resp ){
          this.router.navigateByUrl(`/dashboard/medicos`);
          return 
        }

        const { nombre, hospital } = resp;
        this.medicoForm.setValue({nombre : nombre, hospital : hospital?._id });
        this.medicoSeleccionado = resp;
      }
    );
  }

}
