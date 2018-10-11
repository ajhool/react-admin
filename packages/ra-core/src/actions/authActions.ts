import { RouteProps } from "react-router";

export const USER_CHECK_SUCCESS = 'RA/USER_CHECK_SUCCESS';
export const USER_LOGIN = 'RA/USER_LOGIN';
export const USER_LOGIN_LOADING = 'RA/USER_LOGIN_LOADING';
export const USER_LOGIN_FAILURE = 'RA/USER_LOGIN_FAILURE';
export const USER_LOGIN_SUCCESS = 'RA/USER_LOGIN_SUCCESS';

export enum AuthTypeKeys {
    USER_CHECK_SUCCESS = 'RA/USER_CHECK_SUCCESS',
    USER_LOGIN = 'RA/USER_LOGIN',
    USER_LOGIN_LOADING = 'RA/USER_LOGIN_LOADING',
    USER_LOGIN_FAILURE = 'RA/USER_LOGIN_FAILURE',
    USER_LOGIN_SUCCESS = 'RA/USER_LOGIN_SUCCESS',
    USER_CHECK = 'RA/USER_CHECK',
    USER_LOGOUT = 'RA/USER_LOGOUT',
    OTHER_ACTION = '__some_other_action__',
}

export interface IUserLogin {
    type: AuthTypeKeys.USER_LOGIN;
    payload: object;
    meta: {
        auth: boolean;
        pathName: string;
    }
}

export const userLogin = (payload: object, pathName: string): IUserLogin => ({
    type: AuthTypeKeys.USER_LOGIN,
    payload,
    meta: { auth: true, pathName },
});

// TODO: Handle routeParams properly.
export interface IUserCheck {
    type: AuthTypeKeys.USER_CHECK;
    payload: object;
    meta: {
        auth: boolean,
        pathName: string;
    }
}

// export const USER_CHECK = 'RA/USER_CHECK';

export const userCheck = (payload: object, pathName: string, routeParams?: RouteProps): IUserCheck => ({
    type: AuthTypeKeys.USER_CHECK,
    payload: {
        ...payload,
        routeParams,
    },
    meta: { auth: true, pathName },
});

// export const USER_LOGOUT = 'RA/USER_LOGOUT';

export interface IUserLogout {
    type: AuthTypeKeys.USER_LOGOUT;
    payload: {
        redirectTo: string
    };
    meta: { auth: boolean };
}

/**
 * Action to trigger logout of the current user. The entire redux state will be cleared
 * thanks to the resettableAppReducer in Admin.
 * @see: Admin.js
 * @param redirectTo Path to direct to after logout
 * @return {{type: string, payload: {redirectTo: string}, meta: {auth: boolean}}}
 */
export const userLogout = (redirectTo: string): IUserLogout => ({
    type: AuthTypeKeys.USER_LOGOUT,
    payload: {
        redirectTo,
    },
    meta: { auth: true },
});

export interface IOtherAction {
    type: AuthTypeKeys.OTHER_ACTION;
}

export type AuthActions =
    IUserLogin |
    IUserCheck |
    IUserLogout |
    IOtherAction;
