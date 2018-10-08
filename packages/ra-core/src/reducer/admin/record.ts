import { INITIALIZE_FORM, RESET_FORM } from '../../actions/formActions';
import { set } from 'lodash';
import { AnyAction } from 'redux';

const initialState = {};

export default (previousState: any = initialState, { type, payload }: AnyAction) => {
    if (type === RESET_FORM) {
        return initialState;
    }

    if (type !== INITIALIZE_FORM) {
        return previousState;
    }

    return Object.keys(payload).reduce(
        (acc, key) => {
            // Ensure we correctly set default values for path with dot notation
            set(acc, key, payload[key]);
            return acc;
        },
        { ...previousState }
    );
};
