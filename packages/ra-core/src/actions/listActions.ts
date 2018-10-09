export const CRUD_CHANGE_LIST_PARAMS = 'RA/CRUD_CHANGE_LIST_PARAMS';
export const SET_LIST_SELECTED_IDS = 'RA/SET_LIST_SELECTED_IDS';
export const TOGGLE_LIST_ITEM = 'RA/TOGGLE_LIST_ITEM';

export const changeListParams = (resource: string, params: any) => ({
    type: CRUD_CHANGE_LIST_PARAMS,
    payload: params,
    meta: { resource },
});

export const setListSelectedIds = (resource: string, ids: number[]) => ({
    type: SET_LIST_SELECTED_IDS,
    payload: ids,
    meta: { resource },
});

export const toggleListItem = (resource: string, id: number) => ({
    type: TOGGLE_LIST_ITEM,
    payload: id,
    meta: { resource },
});
