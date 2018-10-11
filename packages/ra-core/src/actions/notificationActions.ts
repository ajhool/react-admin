// export const SHOW_NOTIFICATION = 'RA/SHOW_NOTIFICATION';

export enum NotificationTypeKeys {
    SHOW_NOTIFICATION = 'RA/SHOW_NOTIFICATION',
    HIDE_NOTIFICATION = 'RA/HIDE_NOTIFICATION',
}

/**
 * @typedef {Object} notificationOptions
 * @param {number} [notificationOptions.autoHideDuration=4000] - The type of the notification
 * @param {Object} [notificationOptions.messageArgs] - Arguments used to translate the message
 */

export interface INotificationOptions {
    autoHideDuration?: number;
    messageArgs?: object;
    undoable?: boolean;
}

export type INotificationTypes = 'info' | 'warning';

export interface INotificationPayload extends INotificationOptions {
    type: 'warning' | 'info';
    message: string;
}

export interface IShowNotification {
    type: NotificationTypeKeys.SHOW_NOTIFICATION;
    payload: INotificationPayload;
};

/**
 * Shows a snackbar/toast notification on the screen
 * @param {string} message - A translatable label or text to display on notification
 * @param {string} [type=info] - The type of the notification
 * @param {notificationOptions} [notificationOptions] - Specify additional parameters of notification
 * @see {@link https://material-ui.com/api/snackbar/|Material ui snackbar component}
 * @see {@link https://material.io/guidelines/components/snackbars-toasts.html|Material ui reference document on snackbar}
 *
 */
export const showNotification = (
    message: string,
    type: 'warning' | 'info' = 'info',
    notificationOptions?: INotificationOptions
): IShowNotification => ({
    type: NotificationTypeKeys.SHOW_NOTIFICATION,
    payload: {
        ...notificationOptions,
        type,
        message,
    },
});

// export const HIDE_NOTIFICATION = 'RA/HIDE_NOTIFICATION';

export interface IHideNotification {
    type: NotificationTypeKeys.HIDE_NOTIFICATION;
}

export const hideNotification = (): IHideNotification => ({
    type: NotificationTypeKeys.HIDE_NOTIFICATION,
});

export type NotificationActions = IShowNotification | IHideNotification;
