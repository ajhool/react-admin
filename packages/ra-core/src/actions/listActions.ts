export const CRUD_CHANGE_LIST_PARAMS = 'RA/CRUD_CHANGE_LIST_PARAMS';
export const SET_LIST_SELECTED_IDS = 'RA/SET_LIST_SELECTED_IDS';
export const TOGGLE_LIST_ITEM = 'RA/TOGGLE_LIST_ITEM';

export enum TypeKeys {
    CRUD_CHANGE_LIST_PARAMS = 'RA/CRUD_CHANGE_LIST_PARAMS',
    SET_LIST_SELECTED_IDS = 'RA/SET_LIST_SELECTED_IDS',
    TOGGLE_LIST_ITEM = 'RA/TOGGLE_LIST_ITEM',
    OTHER_ACTION = '__any_other_action_type__',
}

export interface IListAction {
    type: TypeKeys;
    payload: any;
}

export interface IChangeListParams {
    type: TypeKeys.CRUD_CHANGE_LIST_PARAMS;
    payload: any;
    meta: {
        resource: string;
    }
}

export const changeListParams = (resource: string, params: any): IChangeListParams => ({
    type: TypeKeys.CRUD_CHANGE_LIST_PARAMS,
    payload: params,
    meta: { resource },
});

export interface ISetListSelectedIds {
    type: TypeKeys.SET_LIST_SELECTED_IDS;
    payload: number[];
    meta: {
        resource: any;
    }
}

export const setListSelectedIds = (resource: string, ids: number[]): ISetListSelectedIds => ({
    type: TypeKeys.SET_LIST_SELECTED_IDS,
    payload: ids,
    meta: { resource },
});

export interface IToggleListItem {
    type: TypeKeys.TOGGLE_LIST_ITEM;
    payload: number;
    meta: { resource: any };
}

export const toggleListItem = (resource: string, id: number) => ({
    type: TOGGLE_LIST_ITEM,
    payload: id,
    meta: { resource },
});

export interface IPassThroughAction {
    type: TypeKeys.OTHER_ACTION;
}

export type ListActions =
    IChangeListParams |
    ISetListSelectedIds |
    IToggleListItem |
    IPassThroughAction;
