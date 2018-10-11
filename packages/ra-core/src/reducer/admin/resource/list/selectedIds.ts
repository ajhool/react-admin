import {
    ListTypeKeys,
    IListAction,
} from '../../../../actions';

export type IState = number[];

const initialState: IState = [];

export default (previousState = initialState, action: IListAction) => {
    switch (action.type) {
        case ListTypeKeys.SET_LIST_SELECTED_IDS:
            return action.payload;
        case ListTypeKeys.TOGGLE_LIST_ITEM: {
            const index = previousState.indexOf(action.payload);
            if (index > -1) {
                return [
                    ...previousState.slice(0, index),
                    ...previousState.slice(index + 1),
                ];
            } else {
                return [...previousState, action.payload];
            }
        }
        default:
            return action.meta && action.meta.unselectAll
                ? initialState
                : previousState;
    }
};
