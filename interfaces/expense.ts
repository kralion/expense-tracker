export interface IGasto {
  id: string;
  fecha: Date;
  descripcion?: string;
  categoría: string;
  cantidad: number;
  assetIdentificador: string;
}
