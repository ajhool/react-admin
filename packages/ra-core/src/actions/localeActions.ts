// export const CHANGE_LOCALE = 'RA/CHANGE_LOCALE';
// export const CHANGE_LOCALE_SUCCESS = 'RA/CHANGE_LOCALE_SUCCESS';
// export const CHANGE_LOCALE_FAILURE = 'RA/CHANGE_LOCALE_FAILURE';

export enum LocaleTypeKeys {
    CHANGE_LOCALE = 'RA/CHANGE_LOCALE',
    CHANGE_LOCALE_SUCCESS = 'RA/CHANGE_LOCALE_SUCCESS',
    CHANGE_LOCALE_FAILURE = 'RA/CHANGE_LOCALE_FAILURE',
}

interface IChangeLocale {
    type: LocaleTypeKeys.CHANGE_LOCALE;
    payload: string;
}

export const changeLocale = (locale: string): IChangeLocale => ({
    type: LocaleTypeKeys.CHANGE_LOCALE,
    payload: locale,
});

interface IChangeLocaleSuccess {
    type: LocaleTypeKeys.CHANGE_LOCALE_SUCCESS;
    payload: {
        locale: string;
        messages: any;
    }
}

export const changeLocaleSuccess = (locale: string, messages: any): IChangeLocaleSuccess => ({
    type: LocaleTypeKeys.CHANGE_LOCALE_SUCCESS,
    payload: {
        locale,
        messages,
    },
});

interface IChangeLocaleFailure {
    type: LocaleTypeKeys.CHANGE_LOCALE_FAILURE;
    error: string;
    payload: {
        locale: string;
    };
}

export const changeLocaleFailure = (locale: string, error: string): IChangeLocaleFailure => ({
    type: LocaleTypeKeys.CHANGE_LOCALE_FAILURE,
    error,
    payload: {
        locale,
    },
});

export type LocaleActions = IChangeLocale | IChangeLocaleSuccess | IChangeLocaleFailure;
