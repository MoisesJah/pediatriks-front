export interface IUser {
    id: number;
    name: string;
    email: string;
    dni: string;
    tipo_user: string;
    password: string;
    personal: {
      id_personal: string;
      nombre: string;
      id_user: number;
    } | null;
}
