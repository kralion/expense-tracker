export interface ISaving {
  id?: string;
  presupuesto_id?: string;
  meta_ahorro?: string | undefined;
  ahorro_actual: string;
}
export interface ISavingContextProvider {
  addSaving: (saving: ISaving) => void;
  deleteSaving: (id: number) => void;
  updateSaving: (saving: ISaving) => void;
  savings: ISaving[];
}
