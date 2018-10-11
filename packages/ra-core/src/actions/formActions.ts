// export const INITIALIZE_FORM = 'RA/INITIALIZE_FORM';
// export const RESET_FORM = 'RA/RESET_FORM';

export enum FormTypeKeys {
    INITIALIZE_FORM = 'RA/INITIALIZE_FORM',
    RESET_FORM = 'RA/RESET_FORM',
}

export interface IInitializeForm {
    type: FormTypeKeys.INITIALIZE_FORM;
    payload: object;
}

export const initializeForm = (initialValues: object): IInitializeForm => ({
    type: FormTypeKeys.INITIALIZE_FORM,
    payload: initialValues,
});

export interface IResetForm {
    type: FormTypeKeys.RESET_FORM;
}

export const resetForm = (): IResetForm => ({
    type: FormTypeKeys.RESET_FORM,
});

export type FormActions = IInitializeForm | IResetForm;
