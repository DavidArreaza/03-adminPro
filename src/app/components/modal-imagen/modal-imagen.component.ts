import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {


  public usuario : any;
  public imagen : any;
  public imgTemp : any = '';

  constructor( public modalService : ModalImagenService, private fileUpdateService : FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalService.cerrarModal();
  }

  getFile( event : any ){
    this.imagen = event.target.files[0];
    
    if( !this.imagen ){ 
      return this.imgTemp = null; 
    }

    const reader = new FileReader();
    reader.readAsDataURL( this.imagen );

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }

    return true;

  }


  updateFile(){

    const id = this.modalService.id;
    const tipo = this.modalService.tipo;

    this.fileUpdateService.actualizarImagen(this.imagen, tipo, id)
    .then( img => {

      Swal.fire('Guardado', 'Cambios guardados', 'success');
      this.modalService.updateImagen.emit(img)
      this.cerrarModal();

    }, (err) => {

      Swal.fire('Error', 'No se puedo cargar la imagen', 'error');

    });
  }

}
