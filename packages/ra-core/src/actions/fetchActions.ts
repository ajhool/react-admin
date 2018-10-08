export const FETCH_START: string = 'RA/FETCH_START';
export const FETCH_END: string = 'RA/FETCH_END';
export const FETCH_ERROR: string = 'RA/FETCH_ERROR';
export const FETCH_CANCEL: string = 'RA/FETCH_CANCEL';

export type FetchType = 


    FETCH_START | 
    FETCH_END   | 
    FETCH_ERROR | 
    FETCH_CANCEL;

export interface FetchAction {
    type: FetchType;
}

export const fetchStart = (): FetchAction => ({
    type: FETCH_START,
});

export const fetchEnd = (): FetchAction => ({
    type: FETCH_END,
});

export const fetchError = (): FetchAction => ({
    type: FETCH_ERROR,
});

export const fetchCancel = (): FetchAction => ({
    type: FETCH_CANCEL,
});
