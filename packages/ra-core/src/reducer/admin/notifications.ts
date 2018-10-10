import {
    TypeKeys as NotificationTypeKeys,
    Actions as NotificationActions,
    INotificationPayload
} from '../../actions/notificationActions';
import { Actions as UndoActions, TypeKeys as UndoTypeKeys } from '../../actions/undoActions';

// TODO: replace any with the shape of the payload in notificationActions.
export type IState = INotificationPayload[];

export default (previousState: IState = [], action: UndoActions | NotificationActions) => {
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
export const getNotification = state => state.admin.notifications[0];
