import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme'); //Saco la ruta

  constructor() { 
    //console.log("--> Settings Service Init");

    const url = localStorage.getItem('theme') || '/assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }

  /**
  * Cambiar el color de tema
  * @param theme 
  */
  changeTheme( theme : string){

    const url = `/assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    
    this.checkCurrentTheme();
  }

  /**
  *  Para cambiar el check de tema elegido
  */
  checkCurrentTheme(){

    const links = document.querySelectorAll('.selector'); //Saca todos los elementos con la clase selector

    links.forEach( element => {

      element.classList.remove('working'); //elimina la clase working
      const btnTheme = element.getAttribute('data-theme'); //Obtener el valor del atributo
      const btnThemeUrl = `/assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if( btnThemeUrl === currentTheme ){
        element.classList.add('working'); //Añadir la clase working
      }

    })

  }

}
