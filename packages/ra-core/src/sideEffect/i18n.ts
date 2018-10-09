import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    CHANGE_LOCALE,
    changeLocaleSuccess,
    changeLocaleFailure,
} from '../actions';
import I18NProvider from 'ra-language-english';
import { SagaIterator } from 'redux-saga';

export default (i18nProvider: I18NProvider) => {
    function* loadMessages(action: any): SagaIterator {
        const locale = action.payload;

        try {
            const messages = yield call(i18nProvider, locale);
            yield put(changeLocaleSuccess(locale, messages));
        } catch (err) {
            yield put(changeLocaleFailure(action.payload.locale, err));
        }
    }
    return function*(): SagaIterator  {
        yield all([takeLatest(CHANGE_LOCALE, loadMessages)]);
    };
};
