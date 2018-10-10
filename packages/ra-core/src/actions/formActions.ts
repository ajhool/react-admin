// export const INITIALIZE_FORM = 'RA/INITIALIZE_FORM';
// export const RESET_FORM = 'RA/RESET_FORM';

export enum TypeKeys {
    INITIALIZE_FORM = 'RA/INITIALIZE_FORM',
    RESET_FORM = 'RA/RESET_FORM',
}

export interface IInitializeForm {
    type: TypeKeys.INITIALIZE_FORM;
    payload: object;
}

export const initializeForm = (initialValues: object): IInitializeForm => ({
    type: TypeKeys.INITIALIZE_FORM,
    payload: initialValues,
});

export interface IResetForm {
    type: TypeKeys.RESET_FORM;
}

export const resetForm = (): IResetForm => ({
    type: TypeKeys.RESET_FORM,
});

export type IFormActions = IInitializeForm | IResetForm;
