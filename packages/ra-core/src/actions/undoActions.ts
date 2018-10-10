// export const UNDOABLE = 'RA/UNDOABLE';
// export const UNDO = 'RA/UNDO';
// export const COMPLETE = 'RA/COMPLETE';
// export const START_OPTIMISTIC_MODE = 'RA/START_OPTIMISTIC_MODE';
// export const STOP_OPTIMISTIC_MODE = 'RA/STOP_OPTIMISTIC_MODE';

export enum TypeKeys {
    UNDOABLE = 'RA/UNDOABLE',
    UNDO = 'RA/UNDO',
    COMPLETE = 'RA/COMPLETE',
    START_OPTIMISTIC_MODE = 'RA/START_OPTIMISTIC_MODE',
    STOP_OPTIMISTIC_MODE = 'RA/STOP_OPTIMISTIC_MODE',
}

export interface IStartUndoable {
    type: TypeKeys.UNDOABLE;
    payload: {
        action: any;
    }
}

export const startUndoable = (action: any): IStartUndoable => ({
    type: TypeKeys.UNDOABLE,
    payload: { action },
});

// Simple generic for actions that only have a type.
export interface IPayloadlessAction<T> { type: T };

export type IUndo = IPayloadlessAction<TypeKeys.UNDO>;
export const undo = (): IUndo => ({
    type: TypeKeys.UNDO,
});

export type IComplete = IPayloadlessAction<TypeKeys.COMPLETE>;
export const complete = (): IComplete => ({
    type: TypeKeys.COMPLETE,
});

export type IStartOptimisticMode = IPayloadlessAction<TypeKeys.START_OPTIMISTIC_MODE>;
export const startOptimisticMode = (): IStartOptimisticMode => ({
    type: TypeKeys.START_OPTIMISTIC_MODE,
});

export type IStopOptimisticMode = IPayloadlessAction<TypeKeys.STOP_OPTIMISTIC_MODE>;
export const stopOptimisticMode = (): IStopOptimisticMode => ({
    type: TypeKeys.STOP_OPTIMISTIC_MODE,
});

export type Actions = IStartUndoable | IUndo | IComplete | IStartOptimisticMode | IStopOptimisticMode;
