export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  nombre: string;
  correo: string;
  rol: string;
  estado: boolean;
  google: boolean;
  uid: string;
}
