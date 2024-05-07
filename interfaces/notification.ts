export interface INotification {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: "INFO" | "WARNING" | "ERROR";
  session_id?: string;
  fecha: string;
}
