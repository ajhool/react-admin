import {
    CHANGE_LOCALE,
    CHANGE_LOCALE_SUCCESS,
    CHANGE_LOCALE_FAILURE,
} from '../../actions/localeActions';
import { AnyAction } from 'redux';

export default (loading: boolean = false, action: AnyAction) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            return true;
        case CHANGE_LOCALE_SUCCESS:
        case CHANGE_LOCALE_FAILURE:
            return false;
        default:
            return loading;
    }
};
