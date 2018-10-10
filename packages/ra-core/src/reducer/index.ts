import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import admin, {
    getResources as adminGetResources,
    getReferenceResource as adminGetReferenceResource,
    getPossibleReferenceValues as adminGetPossibleReferenceValues,
    isLoggedIn as adminIsLoggedIn,
    IState as IAdminState
} from './admin';
export { getNotification } from './admin/notifications';
import i18nReducer, { getLocale as adminGetLocale, IState as II18NState } from './i18n';
export default (customReducers, locale, messages) =>
    combineReducers({
        admin,
        i18n: i18nReducer(locale, messages),
        form: formReducer,
        routing: routerReducer,
        ...customReducers,
    });


export interface IRootState {
    readonly admin: IAdminState;
    readonly i18n: II18NState;
    readonly form: any;
    readonly routing: any;
}

// selectors:

export const getPossibleReferenceValues = (state: IRootState, props) =>
    adminGetPossibleReferenceValues(state.admin, props);
export const getResources = (state: IRootState) => adminGetResources(state.admin);
export const getReferenceResource = (state: IRootState, props) =>
    adminGetReferenceResource(state.admin, props);
export const isLoggedIn = (state: IRootState) => adminIsLoggedIn(state.admin);
export const getLocale = (state: IRootState) => adminGetLocale(state.i18n);
export { getPossibleReferences } from './admin';
