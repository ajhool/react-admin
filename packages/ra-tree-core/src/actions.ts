export enum ActionTypes {
    TOGGLE_NODE = 'RA/TREE/TOGGLE_NODE',
    EXPAND_NODE = 'RA/TREE/EXPAND_NODE',
    CLOSE_NODE = 'RA/TREE/CLOSE_NODE'
}

export interface ITreeAction {
    type: ActionTypes;
    payload: number;
    meta: {
        resource: any;
    }
}

export const toggleNode = (resource: any, nodeId: number): ITreeAction => ({
    type: ActionTypes.TOGGLE_NODE,
    payload: nodeId,
    meta: { resource },
});

export const expandNode = (resource: any, nodeId: number): ITreeAction => ({
    type: ActionTypes.EXPAND_NODE,
    payload: nodeId,
    meta: { resource },
});

export const closeNode = (resource: any, nodeId: number): ITreeAction => ({
    type: ActionTypes.CLOSE_NODE,
    payload: nodeId,
    meta: { resource },
});
