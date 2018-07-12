export class Aprendiz {
    
    constructor(
        public tipoDocumento: string,
        public numeroDocumento: string ,
        public nombre: string,
        public apellido: string,
        public ficha: string,
        public estado: string,
        public nivelFormacion?: string,
        public programa?: string,
        public alternativaPractica?: string,
        public celular?: string,
        public telefono?: string,
        public correo?: string,
        public _id?: string
    ) {}
}
