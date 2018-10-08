import { put, takeEvery } from 'redux-saga/effects';
import { showNotification, INotificationTypes } from '../actions/notificationActions';

interface IHandleNotification {
    error: string | Error;
    meta: {
        notification: {
            body: string;
            level: INotificationTypes;
            messageArgs: object;
        }
        optimistic: boolean;
    }
}

/**
 * Notification Side Effects
 */
function* handleNotification({ error, meta: { notification, optimistic } }: IHandleNotification) {
    const { body, level, messageArgs = {} } = notification;
    if (error) {
        return yield put(
            showNotification(
                (typeof error === 'string') ? error : error.message || body,
                level || 'warning',
                {
                    messageArgs,
                    undoable: false,
                }
            )
        );
    }
    yield put(
        showNotification(body, level || 'info', {
            messageArgs,
            undoable: optimistic,
        })
    );
}

export default function*() {
    yield takeEvery(
        //@ts-ignore
        action => action.meta && action.meta.notification,
        handleNotification
    );
}
