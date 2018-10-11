import { LocaleTypeKeys, LocaleActions } from '../../actions';

type IState = any;

export default (defaultMessages: any) => {
    return (previousState: IState = defaultMessages, action: LocaleActions) => {
        switch (action.type) {
            case LocaleTypeKeys.CHANGE_LOCALE_SUCCESS:
                return action.payload.messages;
            default:
                return previousState;
        }
    };
};
