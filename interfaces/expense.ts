export interface IGasto {
  id: number;
  usuarioId: number;
  fecha: Date;
  categoria: "Educacion" | "Transporte" | "Personal" | "Comida" | "Salud";
  cantidad: number;
  descripcion: string;
}
