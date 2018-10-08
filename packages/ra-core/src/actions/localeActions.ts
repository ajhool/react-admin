export const CHANGE_LOCALE: string = 'RA/CHANGE_LOCALE';
export const CHANGE_LOCALE_SUCCESS: string = 'RA/CHANGE_LOCALE_SUCCESS';
export const CHANGE_LOCALE_FAILURE: string = 'RA/CHANGE_LOCALE_FAILURE';

export const changeLocale = (locale: string) => ({
    type: CHANGE_LOCALE,
    payload: locale,
});

export const changeLocaleSuccess = (locale: string, messages: any) => ({
    type: CHANGE_LOCALE_SUCCESS,
    payload: {
        locale,
        messages,
    },
});

export const changeLocaleFailure = (locale: string, error: string) => ({
    type: CHANGE_LOCALE_FAILURE,
    error,
    payload: {
        locale,
    },
});
