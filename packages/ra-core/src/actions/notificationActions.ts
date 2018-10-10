// export const SHOW_NOTIFICATION = 'RA/SHOW_NOTIFICATION';

export enum TypeKeys {
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

export interface IShowNotification {
    type: string;
    payload: INotificationOptions & { type: INotificationTypes, message: string };
};

export interface INotificationPayload extends INotificationOptions {
    type: INotificationTypes;
    message: string;
}

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
    type: INotificationTypes = 'info',
    notificationOptions?: INotificationOptions
): IShowNotification => ({
    type: TypeKeys.SHOW_NOTIFICATION,
    payload: {
        ...notificationOptions,
        type,
        message,
    },
});

// export const HIDE_NOTIFICATION = 'RA/HIDE_NOTIFICATION';

interface IHideNotification {
    type: TypeKeys.HIDE_NOTIFICATION;
}

export const hideNotification = (): IHideNotification => ({
    type: TypeKeys.HIDE_NOTIFICATION,
});
