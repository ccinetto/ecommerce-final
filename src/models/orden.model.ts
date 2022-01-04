export interface IDireccion {
  calle: { type: string; required: true };
  altura: { type: string; required: true };
  zipcode: { type: string; required: true };
  piso: string;
  departamento: string;
}
