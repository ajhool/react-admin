import {
    TypeKeys as UITypeKeys,
    Actions as UIActions
} from '../../actions/uiActions';

import {
    TypeKeys as UndoTypeKeys,
    Actions as UndoActions
} from '../../actions/undoActions';

export interface IState {
    sidebarOpen: boolean;
    optimistic: boolean;
    viewVersion: number;
}

const defaultState = {
    sidebarOpen: false,
    optimistic: false,
    viewVersion: 0,
};

export default (previousState: IState = defaultState, action: UndoActions | UIActions) => {
    switch (action.type) {
        case UITypeKeys.TOGGLE_SIDEBAR:
            return {
                ...previousState,
                sidebarOpen: !previousState.sidebarOpen,
            };
        case UITypeKeys.SET_SIDEBAR_VISIBILITY:
            return { ...previousState, sidebarOpen: action.payload };
        case UITypeKeys.REFRESH_VIEW:
            return {
                ...previousState,
                viewVersion: previousState.viewVersion + 1,
            };
        case UndoTypeKeys.START_OPTIMISTIC_MODE:
            return { ...previousState, optimistic: true };
        case UndoTypeKeys.STOP_OPTIMISTIC_MODE:
            return { ...previousState, optimistic: false };
        default:
            return previousState;
    }
};
