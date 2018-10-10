import {
    FETCH_START,
    FETCH_END,
    FETCH_ERROR,
    FETCH_CANCEL,
} from '../../actions/fetchActions';

import {
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
} from '../../actions/authActions';
import { AnyAction } from 'redux';

export type IState = number;

export default (previousState: IState = 0, { type }: AnyAction) => {
    switch (type) {
        case FETCH_START:
        case USER_LOGIN_LOADING:
            return previousState + 1;
        case FETCH_END:
        case FETCH_ERROR:
        case FETCH_CANCEL:
        case USER_LOGIN_SUCCESS:
        case USER_LOGIN_FAILURE:
            return Math.max(previousState - 1, 0);
        default:
            return previousState;
    }
};
