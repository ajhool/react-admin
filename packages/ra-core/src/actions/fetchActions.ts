// export const FETCH_START = 'RA/FETCH_START';
// export const FETCH_END = 'RA/FETCH_END';
// export const FETCH_ERROR = 'RA/FETCH_ERROR';
// export const FETCH_CANCEL = 'RA/FETCH_CANCEL';

export enum FetchTypeKeys {
    FETCH_START =  'RA/FETCH_START',
    FETCH_END = 'RA/FETCH_END',
    FETCH_ERROR = 'RA/FETCH_ERROR',
    FETCH_CANCEL = 'RA/FETCH_CANCEL',
}

export interface IFetchStart {
    type: FetchTypeKeys.FETCH_START;
}

export const fetchStart = (): IFetchStart => ({
    type: FetchTypeKeys.FETCH_START,
});

export interface IFetchEnd {
    type: FetchTypeKeys.FETCH_END;
}

export const fetchEnd = (): IFetchEnd => ({
    type: FetchTypeKeys.FETCH_END,
});

export interface IFetchError {
    type: FetchTypeKeys.FETCH_ERROR;
}

export const fetchError = (): IFetchError => ({
    type: FetchTypeKeys.FETCH_ERROR,
});

export interface IFetchCancel {
    type: FetchTypeKeys.FETCH_CANCEL;
}

export const fetchCancel = (): IFetchCancel => ({
    type: FetchTypeKeys.FETCH_CANCEL,
});

export type FetchActions = IFetchStart | IFetchEnd | IFetchError | IFetchCancel;
