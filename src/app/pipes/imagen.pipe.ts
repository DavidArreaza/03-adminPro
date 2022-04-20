import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( image : string, tipo : 'usuarios'|'medicos'|'hospitales'): string {

    if( !image ){
      return `${base_url}/upload/usuarios/no-image`;
    } else if ( image.includes('https') ){
      return image;
    } else if ( image ){
      return `${base_url}/upload/${tipo}/${image}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }   

  }

}
