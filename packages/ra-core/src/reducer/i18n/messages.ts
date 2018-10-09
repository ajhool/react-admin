import { CHANGE_LOCALE_SUCCESS } from '../../actions';

export default defaultMessages => {
    return (previousState = defaultMessages, { type, payload }) => {
        switch (type) {
            case CHANGE_LOCALE_SUCCESS:
                return payload.messages;
            default:
                return previousState;
        }
    };
};
