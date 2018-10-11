import { DEFAULT_LOCALE } from '../../i18n';
import { LocaleTypeKeys, LocaleActions } from '../../actions/localeActions';

export type IState = string;

export default (initialLocale: IState = DEFAULT_LOCALE) => (
    previousLocale: string = initialLocale,
    action: LocaleActions
) => {
    switch (action.type) {
        case LocaleTypeKeys.CHANGE_LOCALE_SUCCESS:
            return action.payload.locale;
        default:
            return previousLocale;
    }
};
