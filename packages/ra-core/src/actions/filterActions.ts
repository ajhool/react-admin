import { IResource } from "./resourcesActions";

// export const CRUD_SHOW_FILTER = 'RA/CRUD_SHOW_FILTER';
// export const CRUD_HIDE_FILTER = 'RA/CRUD_HIDE_FILTER';
// export const CRUD_SET_FILTER = 'RA/CRUD_SET_FILTER';

export enum TypeKeys {
    CRUD_SHOW_FILTER = 'RA/CRUD_SHOW_FILTER',
    CRUD_HIDE_FILTER = 'RA/CRUD_HIDE_FILTER',
    CRUD_SET_FILTER = 'RA/CRUD_SET_FILTER',
}

interface IShowFilter {
    type: TypeKeys.CRUD_SHOW_FILTER;
    payload: { field: string };
    meta: { resource: IResource };
}

export const showFilter = (resource: IResource, field: string): IShowFilter => ({
    type: TypeKeys.CRUD_SHOW_FILTER,
    payload: { field },
    meta: { resource },
});

interface IHideFilter {
    type: TypeKeys.CRUD_HIDE_FILTER;
    payload: { field: string };
    meta: { resource: IResource };
}

export const hideFilter = (resource: IResource, field: string): IHideFilter => ({
    type: TypeKeys.CRUD_HIDE_FILTER,
    payload: { field },
    meta: { resource },
});

interface ISetFilter {
    type: TypeKeys.CRUD_SET_FILTER,
    payload: { field: string, value: any },
    meta: { resource: IResource },
}

export const setFilter = (resource: IResource, field: string, value: any): ISetFilter => ({
    type: TypeKeys.CRUD_SET_FILTER,
    payload: { field, value },
    meta: { resource },
});

export type Actions = IShowFilter | IHideFilter | ISetFilter;
