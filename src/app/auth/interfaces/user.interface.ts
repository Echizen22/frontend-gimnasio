export interface User {
  _id:             string;
  dni:             string;
  nombre:          string;
  apellidos:       string;
  fechaNacimiento: string;
  telefono:        number;
  correo:          string;
  repetirCorreo:   string;
  direccion:       string;
  estado:          string;
  fechaIni:        string;
  superUsuario:    boolean;
  clasesReservadas?: string[];
}
