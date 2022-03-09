

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

}
