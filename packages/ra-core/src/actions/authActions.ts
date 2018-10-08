export const USER_CHECK_SUCCESS = 'RA/USER_CHECK_SUCCESS';
export const USER_LOGIN = 'RA/USER_LOGIN';
export const USER_LOGIN_LOADING = 'RA/USER_LOGIN_LOADING';
export const USER_LOGIN_FAILURE = 'RA/USER_LOGIN_FAILURE';
export const USER_LOGIN_SUCCESS = 'RA/USER_LOGIN_SUCCESS';

export const userLogin = (payload: object, pathName: string) => ({
    type: USER_LOGIN,
    payload,
    meta: { auth: true, pathName },
});

export const USER_CHECK = 'RA/USER_CHECK';

export const userCheck = (payload: object, pathName: string, routeParams: any) => ({
    type: USER_CHECK,
    payload: {
        ...payload,
        routeParams,
    },
    meta: { auth: true, pathName },
});

export const USER_LOGOUT = 'RA/USER_LOGOUT';

interface IUserLogoutReturn {
    type: string;
    payload: {redirectTo: string};
    meta: {auth: boolean};
}

/**
 * Action to trigger logout of the current user. The entire redux state will be cleared
 * thanks to the resettableAppReducer in Admin.
 * @see: Admin.js
 * @param redirectTo Path to direct to after logout
 * @return {{type: string, payload: {redirectTo: string}, meta: {auth: boolean}}}
 */
export const userLogout = (redirectTo: string): IUserLogoutReturn => ({
    type: USER_LOGOUT,
    payload: {
        redirectTo,
    },
    meta: { auth: true },
});
