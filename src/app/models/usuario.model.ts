import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public uid?         : string,
        public nombre       : string = "",
        public email        : string = "",
        public password?    : string,
        public image?       : string,
        public rol?         : string,
        public google?      : boolean
    ){};

    get imagenUrl(){

        if( !this.image ){
            return `${base_url}/upload/usuarios/no-image`
        } else if ( this.image?.includes('https') ){
            return this.image;
        } else if ( this.image ){
            return `${base_url}/upload/usuarios/${this.image}`
        } else {
            return `${base_url}/upload/usuarios/no-image`
        }        
    }

}
