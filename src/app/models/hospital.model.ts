interface _hospitalUser {
    _id : string,
    nombre : string,
    img : string
}

export class Hospital {

    constructor(
        public _id?         : string,
        public nombre       : string = "",
        public image        : string = "",
        public usuario?     : _hospitalUser
    ){};

    // get imagenUrl(){

    //     if( !this.image ){
    //         return `${base_url}/upload/usuarios/no-image`
    //     } else if ( this.image?.includes('https') ){
    //         return this.image;
    //     } else if ( this.image ){
    //         return `${base_url}/upload/usuarios/${this.image}`
    //     } else {
    //         return `${base_url}/upload/usuarios/no-image`
    //     }        
    // }

}
