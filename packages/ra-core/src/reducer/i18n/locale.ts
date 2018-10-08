import { DEFAULT_LOCALE } from '../../i18n';
import { CHANGE_LOCALE_SUCCESS } from '../../actions/localeActions';
import { AnyAction } from 'redux';

export default (initialLocale: string = DEFAULT_LOCALE) => (
    previousLocale: string = initialLocale,
    { type, payload }: AnyAction
) => {
    switch (type) {
        case CHANGE_LOCALE_SUCCESS:
            return payload.locale;
        default:
            return previousLocale;
    }
};
