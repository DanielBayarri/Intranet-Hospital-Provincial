export interface JwtPayload {
  dni: string;
  //Fecha creacion
  iat?: number;
  //Fecha expira
  exp?: number;
}
