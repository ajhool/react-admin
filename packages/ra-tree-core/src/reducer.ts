import { ActionTypes, ITreeAction } from './actions';

export interface ITreeState {
    [resource: string]: {
        [nodeId: number]: {
            type: ActionTypes;
        }
    }
}

const initialState = {};

export default (state: ITreeState = initialState, { type, payload: nodeId, meta }: ITreeAction): ITreeState => {
    if (!(type in ActionTypes)) {
        return state;
    }
    if (!meta.resource) {
        console.warn(`The ${type} action does not have a resource meta`); // eslint-disable-line
        return state;
    }

    return {
        ...state,
        [meta.resource]: {
            ...(state[meta.resource] || {}),
            [nodeId]:
                type === ActionTypes.TOGGLE_NODE
                    ? state[meta.resource]
                        ? !state[meta.resource][nodeId]
                        : true
                    : type === ActionTypes.EXPAND_NODE,
        },
    };
};
