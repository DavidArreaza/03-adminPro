import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos : Medico[] = [];
  public cargando : boolean = true;

  public imgSubs : Subscription | undefined;
  
  constructor( private medicoService : MedicosService, private modalService : ModalImagenService,
    private busquedaService : BusquedasService ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.getAllMedicos();

    this.imgSubs = this.modalService.updateImagen.pipe(
      delay(100)
    ).subscribe(img => this.getAllMedicos()); // Para cuando se actualiza una imagen

  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  /**
   * Muestra un listado de médicos
   */
  getAllMedicos(){
    this.medicoService.getAllMedicos().subscribe(
      resp => {
        this.medicos = resp;
        this.cargando = false;
      }
    )
  }


   /**
   * Actualiza un médico
   * @param medico 
   */
    guardarCambios( medico : Medico ){
      this.medicoService.updateMedico(medico._id || '', medico.nombre).subscribe(
        resp => {
          this.getAllMedicos();
          Swal.fire('Actualizado', medico.nombre, 'success');
        }
      )
    }
  
    /**
     * Elimina un medico
     */
     eliminarMedico( medico : Medico ){

      Swal.fire({
        title: '¿Eliminar médico?',
        text: `No podrá recuperar los datos eliminados de ${medico.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
  
          this.medicoService.deleteMedico(medico._id || '').subscribe( resp => {
            this.getAllMedicos();
            Swal.fire(
              'Eliminado',
              `${medico.nombre} ha sido eliminado`,
              'success'
            ) 
          });
          
        }
      })
    }
  
  
    // /**
    //  * Abre un modal para crear un nuevo hospital
    //  */
    // async modalCrearMedico(){
    //   const valor = await Swal.fire<string>({
    //     title: 'Añadir médico',
    //     text: 'Escriba el nombre del médico',
    //     input: 'text',
    //     inputPlaceholder: 'Nombre del médico',
    //     showCancelButton: true,
    //   })
      
    //   const tamaño = valor.value?.length || '';
  
    //   if(tamaño > 0){
    //     this.medicoService.crearMedico(valor.value || '').subscribe(
    //       (resp : any) => {
    //         this.medicos.push( resp.hospital )
    //         //this.getAllHospitales();
    //         Swal.fire('Hospital añadido', valor.value, 'success');
    //       }
    //     )
    //   }else{
    //     Swal.fire('Debe escribir un nombre válido', valor.value, 'warning');
    //   }
      
    // }
  
    /**
     * Abre un modal para cambiar la foto del médico
     * @param medico
     */
    abrirModal( medico : Medico ){
      this.modalService.abrirModal('medicos', medico._id, medico.image);
    }
  
    buscarMedico( valor : string){
      if(valor.length === 0){
        this.getAllMedicos();
      }
  
      this.busquedaService.search( 'medicos', valor).subscribe( (resp : any) => {
        this.medicos = resp;
      })
    }

}
