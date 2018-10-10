import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../../actions';

// TODO: There appears to be other fields in this state.
export interface IState {
    isLoggedIn: boolean;
}

const initialState = { isLoggedIn: false };

export default (previousState: IState = initialState, action: any) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { ...previousState, isLoggedIn: true };
        case USER_LOGOUT:
            return { ...previousState, isLoggedIn: false };
    }

    return previousState;
};

export const isLoggedIn = (state: IState): boolean => state.isLoggedIn;
