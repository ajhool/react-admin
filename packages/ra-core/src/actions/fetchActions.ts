// export const FETCH_START = 'RA/FETCH_START';
// export const FETCH_END = 'RA/FETCH_END';
// export const FETCH_ERROR = 'RA/FETCH_ERROR';
// export const FETCH_CANCEL = 'RA/FETCH_CANCEL';

export enum TypeKeys {
    FETCH_START =  'RA/FETCH_START',
    FETCH_END = 'RA/FETCH_END',
    FETCH_ERROR = 'RA/FETCH_ERROR',
    FETCH_CANCEL = 'RA/FETCH_CANCEL',
}

export interface IFetchStart {
    type: TypeKeys.FETCH_START;
}

export const fetchStart = (): IFetchStart => ({
    type: TypeKeys.FETCH_START,
});

export interface IFetchEnd {
    type: TypeKeys.FETCH_END;
}

export const fetchEnd = (): IFetchEnd => ({
    type: TypeKeys.FETCH_END,
});

export interface IFetchError {
    type: TypeKeys.FETCH_ERROR;
}

export const fetchError = (): IFetchError => ({
    type: TypeKeys.FETCH_ERROR,
});

export interface IFetchCancel {
    type: TypeKeys.FETCH_CANCEL;
}

export const fetchCancel = (): IFetchCancel => ({
    type: TypeKeys.FETCH_CANCEL,
});

export type Actions = IFetchStart | IFetchEnd | IFetchError | IFetchCancel;
