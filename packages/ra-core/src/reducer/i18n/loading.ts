import {
    LocaleTypeKeys,
    LocaleActions
} from '../../actions';

export type IState = boolean;

export default (loading: IState = false, action: LocaleActions) => {
    switch (action.type) {
        case LocaleTypeKeys.CHANGE_LOCALE:
            return true;
        case LocaleTypeKeys.CHANGE_LOCALE_SUCCESS:
        case LocaleTypeKeys.CHANGE_LOCALE_FAILURE:
            return false;
        default:
            return loading;
    }
};
