export interface ISaving{
    id: number;
    meta_ahorro?: string | undefined;
    ahorro_actual?: number;
}
export interface ISavingContextProvider {
    addSaving: (saving: ISaving) => void;
    deleteSaving: (id: number) => void;
    updateSaving: (saving: ISaving) => void;
    savings: ISaving[];
}