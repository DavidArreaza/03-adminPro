import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales : Hospital[] = [];
  public cargando : boolean = true;

  public imgSubs : Subscription | undefined;

  constructor( private hospitalService : HospitalService, private modalService : ModalImagenService,
    private busquedaService : BusquedasService ) {}

  ngOnInit(): void {
    this.cargando = true;
    this.getAllHospitales();

    this.imgSubs = this.modalService.updateImagen.pipe(
      delay(100)
    ).subscribe(img => this.getAllHospitales()); // Para cuando se actualiza una imagen

  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  /**
   * Delvuel todos los hospitales
   */
  getAllHospitales(){
    this.cargando = true
    this.hospitalService.getAllHospitales().subscribe( hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
    })
  }

  /**
   * Actualiza un hospital
   * @param hospital 
   */
  guardarCambios( hospital : Hospital ){
    this.hospitalService.updateHospital(hospital._id || '', hospital.nombre).subscribe(
      resp => {
        this.getAllHospitales();
        Swal.fire('Actaulizado', hospital.nombre, 'success');
      }
    )
  }

  /**
   * Elimina un hospital
   */
  eliminarHospital( hospital : Hospital ){
    this.hospitalService.deleteHospital(hospital._id || '').subscribe(
      resp => {
        this.getAllHospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success');
      }
    )
  }


  /**
   * Abre un modal para crear un nuevo hospital
   */
  async modalCrearHospital(){
    const valor = await Swal.fire<string>({
      title: 'Añadir hospital',
      text: 'Escriba el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })
    
    const tamaño = valor.value?.length || '';

    if(tamaño > 0){
      this.hospitalService.crearHospital(valor.value || '').subscribe(
        (resp : any) => {
          this.hospitales.push( resp.hospital )
          //this.getAllHospitales();
          Swal.fire('Hospital añadido', valor.value, 'success');
        }
      )
    }else{
      Swal.fire('Debe escribir un nombre válido', valor.value, 'warning');
    }
    
  }

  /**
   * Abre un modal para cambiar la foto del hospital
   * @param hospital
   */
  abrirModal( hospital : Hospital ){
    this.modalService.abrirModal('hospitales', hospital._id, hospital.image);
  }

  buscarHospital( valor : string){
    if(valor.length === 0){
      this.getAllHospitales();
    }

    this.busquedaService.search( 'hospitales', valor).subscribe( (resp : any) => {
      this.hospitales = resp;
    })
  }

}
