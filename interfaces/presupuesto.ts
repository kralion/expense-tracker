export interface IPresupuesto{
    id?: string;
    monto?: string | undefined;
    fecha_registro?: string | undefined;
    fecha_final?: string | undefined;
    descripcion?: string | undefined;
    assetIdentificador?: string;
    usuario_id?: string;
}
export interface IPresupuestoContextProvider {
    addPresupuesto: (presupuesto: IPresupuesto) => void;
    deletePresupuesto: (id: number) => void;
    updatePresupuesto: (presupuesto: IPresupuesto) => void;
    presupuestos: IPresupuesto[];
}