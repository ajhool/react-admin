import { FormTypeKeys, FormActions } from '../../actions/formActions';
import { set } from 'lodash';

// TODO: Not really sure what the shape of this is.
export interface IState {
    [item: string]: string;
}

const initialState = {};

export default (previousState: any = initialState, action: FormActions) => {
    if (action.type === FormTypeKeys.RESET_FORM) {
        return initialState;
    }

    if (action.type !== FormTypeKeys.INITIALIZE_FORM) {
        return previousState;
    }

    return Object.keys(action.payload).reduce(
        (acc, key) => {
            // Ensure we correctly set default values for path with dot notation
            set(acc, key, action.payload[key]);
            return acc;
        },
        { ...previousState }
    );
};
