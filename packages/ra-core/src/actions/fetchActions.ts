export const FETCH_START: string = 'RA/FETCH_START';
export const FETCH_END: string = 'RA/FETCH_END';
export const FETCH_ERROR: string = 'RA/FETCH_ERROR';
export const FETCH_CANCEL: string = 'RA/FETCH_CANCEL';

export const fetchStart = () => ({
    type: FETCH_START,
});

export const fetchEnd = () => ({
    type: FETCH_END,
});

export const fetchError = () => ({
    type: FETCH_ERROR,
});

export const fetchCancel = () => ({
    type: FETCH_CANCEL,
});
