import { put, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { destroy } from 'redux-form';
import { resetForm } from '../actions/formActions';
import { REDUX_FORM_NAME } from '../form/constants';

interface IRecordForm {
    payload: {
        pathname: string;
        state: {
            skipFormReset: boolean
        }
    }
}

export function* handleLocationChange({ payload: { state } }: IRecordForm) {
    if (state && state.skipFormReset) {
        return;
    }

    yield put(resetForm());
    yield put(destroy(REDUX_FORM_NAME));
}

export default function* recordForm() {
    //@ts-ignore Not sure how to properly handle this.
    yield takeEvery(LOCATION_CHANGE, handleLocationChange);
}
