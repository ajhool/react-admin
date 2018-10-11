import {
    NotificationTypeKeys,
    NotificationActions,
    INotificationPayload
} from '../../actions/notificationActions';
import { UndoActions, UndoTypeKeys } from '../../actions/undoActions';
import { IRootState } from 'ra-core/src/reducer';

// TODO: replace any with the shape of the payload in notificationActions.
export type IState = INotificationPayload[];

export default (previousState: IState = [], action: NotificationActions | UndoActions) => {
    switch (action.type) {
        case NotificationTypeKeys.SHOW_NOTIFICATION:
            return previousState.concat(action.payload);
        case NotificationTypeKeys.HIDE_NOTIFICATION:
        case UndoTypeKeys.UNDO:
            return previousState.slice(1);
        default:
            return previousState;
    }
};

/**
 * Returns the first available notification to show
 * @param {Object} state - Redux state
 */
export const getNotification = (state: IRootState) => state.admin.notifications[0];
