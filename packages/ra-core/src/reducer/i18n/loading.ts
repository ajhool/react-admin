import {
    TypeKeys,
    Actions as LocaleActions
} from '../../actions/localeActions';

export type IState = boolean;

export default (loading: IState = false, action: LocaleActions) => {
    switch (action.type) {
        case TypeKeys.CHANGE_LOCALE:
            return true;
        case TypeKeys.CHANGE_LOCALE_SUCCESS:
        case TypeKeys.CHANGE_LOCALE_FAILURE:
            return false;
        default:
            return loading;
    }
};
