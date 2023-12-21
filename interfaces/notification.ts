export interface INotification {
  id: string;
  titulo: string;
  descripcion: string;
  icono: {
    uri: string;
  };
  session_id?: string;
  fecha: Date;
}
