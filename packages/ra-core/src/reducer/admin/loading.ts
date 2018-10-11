import {
    FetchActions,
    FetchTypeKeys
} from '../../actions/fetchActions';

import {
    AuthActions,
    AuthTypeKeys
} from '../../actions/authActions';

export type IState = number;

export default (previousState: IState = 0, action: FetchActions | AuthActions) => {
    switch (action.type) {
        case FetchTypeKeys.FETCH_START:
        case AuthTypeKeys.USER_LOGIN_LOADING:
            return previousState + 1;
        case FetchTypeKeys.FETCH_END:
        case FetchTypeKeys.FETCH_ERROR:
        case FetchTypeKeys.FETCH_CANCEL:
        case AuthTypeKeys.USER_LOGIN_SUCCESS:
        case AuthTypeKeys.USER_LOGIN_FAILURE:
            return Math.max(previousState - 1, 0);
        default:
            return previousState;
    }
};
