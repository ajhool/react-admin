import { combineReducers } from 'redux';
import localeReducer, { IState as ILocaleState } from './locale';
import messagedReducer from './messages';
import loading, { IState as ILoadingState } from './loading';

interface IState {
    locale: ILocaleState;
    loading: ILoadingState;
}

export default (initialLocale: string, defaultMessages: string) =>
    combineReducers({
        locale: localeReducer(initialLocale),
        messages: messagedReducer(defaultMessages),
        loading,
    });

export const getLocale = (state: IState) => state.locale;
