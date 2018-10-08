import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';

import resolveRedirectTo from '../util/resolveRedirectTo';

interface IHandleRedirection {
    payload: any;
    requestPayload: any;
    meta: {
        basePath: string;
        redirectTo: string;
    }
}

/**
 * Redirection Side Effects
 */
export function* handleRedirection({
    payload,
    requestPayload,
    meta: { basePath, redirectTo },
}: IHandleRedirection) {
    return redirectTo
        ? yield put(
              push(
                  resolveRedirectTo(
                      redirectTo,
                      basePath,
                      payload
                          ? payload.id ||
                            (payload.data ? payload.data.id : null)
                          : requestPayload
                              ? requestPayload.id
                              : null,
                      payload && payload.data
                          ? payload.data
                          : requestPayload && requestPayload.data
                              ? requestPayload.data
                              : null
                  )
              )
          )
        : yield put(reset('record-form')); // explicit no redirection, reset the form
}

export default function*() {
    yield takeEvery(
        //@ts-ignore Not sure how to properly handle this.
        (action: IHandleRedirection) => action.meta && typeof action.meta.redirectTo !== 'undefined',
        handleRedirection
    );
}
