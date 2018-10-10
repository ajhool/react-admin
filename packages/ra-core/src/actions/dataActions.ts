import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
    GET_MANY,
    GET_MANY_REFERENCE,
} from '../dataFetchActions';
import { IResource } from './resourcesActions';

// export const CRUD_GET_LIST = 'RA/CRUD_GET_LIST';
export const CRUD_GET_LIST_LOADING = 'RA/CRUD_GET_LIST_LOADING';
export const CRUD_GET_LIST_FAILURE = 'RA/CRUD_GET_LIST_FAILURE';
export const CRUD_GET_LIST_SUCCESS = 'RA/CRUD_GET_LIST_SUCCESS';

interface IPagination {
    page: number;
    perPage: number;
}

type ISort = 'ASC' | 'DESC';

export enum TypeKeys {
    CRUD_GET_LIST = 'RA/CRUD_GET_LIST',
    CRUD_GET_ALL = 'RA/CRUD_GET_ALL',
    CRUD_GET_ONE = 'RA/CRUD_GET_ONE',
    CRUD_CREATE = 'RA/CRUD_CREATE',
    CRUD_UPDATE = 'RA/CRUD_UPDATE',
    CRUD_UPDATE_MANY = 'RA/CRUD_UPDATE_MANY',
    CRUD_DELETE = 'RA/CRUD_DELETE',
    CRUD_DELETE_MANY = 'RA/CRUD_DELETE_MANY',
    CRUD_GET_MATCHING = 'RA/CRUD_GET_MATCHING',
    CRUD_GET_MANY = 'RA/CRUD_GET_MANY',
    CRUD_GET_MANY_REFERENCE = 'RA/CRUD_GET_MANY_REFERENCE'
}

interface IFilter {
    todo: string;
}

export interface ICrudGetList {
    type: TypeKeys.CRUD_GET_LIST;
    payload: {
        pagination: IPagination;
        sort: ISort;
        filter: IFilter;
    };
    meta: {
        resource: IResource;
        fetch: string; // TODO: GET_LIST Comes from dataFetchActions, which should be changed to enum for static typing.
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            }
        }
    }
}

export const crudGetList = (resource: IResource, pagination: IPagination, sort: ISort, filter: IFilter): ICrudGetList => ({
    type: TypeKeys.CRUD_GET_LIST,
    payload: { pagination, sort, filter },
    meta: {
        resource,
        fetch: GET_LIST,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

// export const CRUD_GET_ALL = 'RA/CRUD_GET_ALL';
export const CRUD_GET_ALL_LOADING = 'RA/CRUD_GET_ALL_LOADING';
export const CRUD_GET_ALL_FAILURE = 'RA/CRUD_GET_ALL_FAILURE';
export const CRUD_GET_ALL_SUCCESS = 'RA/CRUD_GET_ALL_SUCCESS';

export interface ICrudGetAll {
    type: TypeKeys.CRUD_GET_ALL;
    payload: { sort: ISort, filter: IFilter, pagination: IPagination },
    meta: {
        resource: IResource,
        fetch: string,
        onSuccess: {
            callback: VoidFunction,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}

export const crudGetAll = (resource: IResource, sort: ISort, filter: IFilter, maxResults: number, callback: VoidFunction): ICrudGetAll => ({
    type: TypeKeys.CRUD_GET_ALL,
    payload: { sort, filter, pagination: { page: 1, perPage: maxResults } },
    meta: {
        resource,
        fetch: GET_LIST,
        onSuccess: {
            callback,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

// export const CRUD_GET_ONE = 'RA/CRUD_GET_ONE';
export const CRUD_GET_ONE_LOADING = 'RA/CRUD_GET_ONE_LOADING';
export const CRUD_GET_ONE_FAILURE = 'RA/CRUD_GET_ONE_FAILURE';
export const CRUD_GET_ONE_SUCCESS = 'RA/CRUD_GET_ONE_SUCCESS';

interface ICrudGetOne {
    type: TypeKeys.CRUD_GET_ONE,
    payload: { id: number },
    meta: {
        resource: IResource;
        fetch: string;
        basePath: string;
        onFailure: {
            notification: {
                body: 'ra.notification.item_doesnt_exist';
                level: 'warning';
            };
            redirectTo: 'list';
            refresh: boolean;
        },
    },
}

export const crudGetOne = (resource: IResource, id: number, basePath: string, refresh: boolean = true): ICrudGetOne => ({
    type: TypeKeys.CRUD_GET_ONE,
    payload: { id },
    meta: {
        resource,
        fetch: GET_ONE,
        basePath,
        onFailure: {
            notification: {
                body: 'ra.notification.item_doesnt_exist',
                level: 'warning',
            },
            redirectTo: 'list',
            refresh,
        },
    },
});

// export const CRUD_CREATE = 'RA/CRUD_CREATE';
export const CRUD_CREATE_LOADING = 'RA/CRUD_CREATE_LOADING';
export const CRUD_CREATE_FAILURE = 'RA/CRUD_CREATE_FAILURE';
export const CRUD_CREATE_SUCCESS = 'RA/CRUD_CREATE_SUCCESS';

interface ICrudCreate {
    type: TypeKeys.CRUD_CREATE;
    payload: { data: any };
    meta: {
        resource: IResource;
        fetch: string;
        onSuccess: {
            notification: {
                body: 'ra.notification.created';
                level: 'info';
                messageArgs: {
                    smart_count: number,
                };
            };
            redirectTo: string;
            basePath: string;
        };
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}

export const crudCreate = (resource: IResource, data: any, basePath: string, redirectTo: string = 'edit'): ICrudCreate => ({
    type: TypeKeys.CRUD_CREATE,
    payload: { data },
    meta: {
        resource,
        fetch: CREATE,
        onSuccess: {
            notification: {
                body: 'ra.notification.created',
                level: 'info',
                messageArgs: {
                    smart_count: 1,
                },
            },
            redirectTo,
            basePath,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

// export const CRUD_UPDATE = 'RA/CRUD_UPDATE';
export const CRUD_UPDATE_LOADING = 'RA/CRUD_UPDATE_LOADING';
export const CRUD_UPDATE_FAILURE = 'RA/CRUD_UPDATE_FAILURE';
export const CRUD_UPDATE_SUCCESS = 'RA/CRUD_UPDATE_SUCCESS';
export const CRUD_UPDATE_OPTIMISTIC = 'RA/CRUD_UPDATE_OPTIMISTIC';

interface ICrudUpdate {
    type: TypeKeys.CRUD_UPDATE,
    payload: {
        id: number;
        data: any;
        previousData: any;
    },
    meta: {
        resource: IResource;
        fetch: string;
        onSuccess: {
            notification: {
                body: 'ra.notification.updated';
                level: 'info';
                messageArgs: {
                    smart_count: number;
                },
            },
            redirectTo: string;
            basePath: string;
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}

export const crudUpdate = (
    resource: IResource,
    id: number,
    data: any,
    previousData: any,
    basePath: string,
    redirectTo: string = 'show'
): ICrudUpdate => ({
    type: TypeKeys.CRUD_UPDATE,
    payload: { id, data, previousData },
    meta: {
        resource,
        fetch: UPDATE,
        onSuccess: {
            notification: {
                body: 'ra.notification.updated',
                level: 'info',
                messageArgs: {
                    smart_count: 1,
                },
            },
            redirectTo,
            basePath,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

// export const CRUD_UPDATE_MANY = 'RA/CRUD_UPDATE_MANY';
export const CRUD_UPDATE_MANY_LOADING = 'RA/CRUD_UPDATE_MANY_LOADING';
export const CRUD_UPDATE_MANY_FAILURE = 'RA/CRUD_UPDATE_MANY_FAILURE';
export const CRUD_UPDATE_MANY_SUCCESS = 'RA/CRUD_UPDATE_MANY_SUCCESS';
export const CRUD_UPDATE_MANY_OPTIMISTIC = 'RA/CRUD_UPDATE_MANY_OPTIMISTIC';

interface ICrudUpdateMany {
    type: TypeKeys.CRUD_UPDATE_MANY;
    payload: {
        ids: number[];
        data: any;
    };
    meta: {
        resource: IResource;
        fetch: string;
        cancelPrevious: boolean;
        onSuccess: {
            notification: {
                body: 'ra.notification.updated',
                level: 'info',
                messageArgs: {
                    smart_count: number;
                },
            },
            basePath: string;
            refresh: boolean;
            unselectAll: boolean;
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}

export const crudUpdateMany = (
    resource: IResource,
    ids: number[],
    data: any,
    basePath: string,
    refresh: boolean = true
): ICrudUpdateMany => ({
    type: TypeKeys.CRUD_UPDATE_MANY,
    payload: { ids, data },
    meta: {
        resource,
        fetch: UPDATE_MANY,
        cancelPrevious: false,
        onSuccess: {
            notification: {
                body: 'ra.notification.updated',
                level: 'info',
                messageArgs: {
                    smart_count: ids.length,
                },
            },
            basePath,
            refresh,
            unselectAll: true,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

// export const CRUD_DELETE = 'RA/CRUD_DELETE';
export const CRUD_DELETE_LOADING = 'RA/CRUD_DELETE_LOADING';
export const CRUD_DELETE_FAILURE = 'RA/CRUD_DELETE_FAILURE';
export const CRUD_DELETE_SUCCESS = 'RA/CRUD_DELETE_SUCCESS';
export const CRUD_DELETE_OPTIMISTIC = 'RA/CRUD_DELETE_OPTIMISTIC';

export interface ICrudDelete {
    type: TypeKeys.CRUD_DELETE;
    payload: {
        id: number;
        previousData: any;
    };
    meta: {
        resource: IResource;
        fetch: string;
        onSuccess: {
            notification: {
                body: 'ra.notification.deleted',
                level: 'info',
                messageArgs: {
                    smart_count: number;
                },
            },
            redirectTo: string;
            basePath: string;
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}

export const crudDelete = (
    resource: IResource,
    id: number,
    previousData: any,
    basePath: string,
    redirectTo: string = 'list'
): ICrudDelete => ({
    type: TypeKeys.CRUD_DELETE,
    payload: { id, previousData },
    meta: {
        resource,
        fetch: DELETE,
        onSuccess: {
            notification: {
                body: 'ra.notification.deleted',
                level: 'info',
                messageArgs: {
                    smart_count: 1,
                },
            },
            redirectTo,
            basePath,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

// export const CRUD_DELETE_MANY = 'RA/CRUD_DELETE_MANY';
export const CRUD_DELETE_MANY_LOADING = 'RA/CRUD_DELETE_MANY_LOADING';
export const CRUD_DELETE_MANY_FAILURE = 'RA/CRUD_DELETE_MANY_FAILURE';
export const CRUD_DELETE_MANY_SUCCESS = 'RA/CRUD_DELETE_MANY_SUCCESS';
export const CRUD_DELETE_MANY_OPTIMISTIC = 'RA/CRUD_DELETE_MANY_OPTIMISTIC';

export interface ICrudDeleteMany {
    type: TypeKeys.CRUD_DELETE_MANY,
    payload: {
        ids: number[];
    },
    meta: {
        resource: IResource,
        fetch: string;
        onSuccess: {
            notification: {
                body: 'ra.notification.deleted',
                level: 'info',
                messageArgs: {
                    smart_count: number;
                },
            },
            basePath: string;
            refresh: boolean;
            unselectAll: boolean;
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}

export const crudDeleteMany = (resource: IResource, ids: number[], basePath: string, refresh = true): ICrudDeleteMany => ({
    type: TypeKeys.CRUD_DELETE_MANY,
    payload: { ids },
    meta: {
        resource,
        fetch: DELETE_MANY,
        onSuccess: {
            notification: {
                body: 'ra.notification.deleted',
                level: 'info',
                messageArgs: {
                    smart_count: ids.length,
                },
            },
            basePath,
            refresh,
            unselectAll: true,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

// export const CRUD_GET_MANY = 'RA/CRUD_GET_MANY';
export const CRUD_GET_MANY_LOADING = 'RA/CRUD_GET_MANY_LOADING';
export const CRUD_GET_MANY_FAILURE = 'RA/CRUD_GET_MANY_FAILURE';
export const CRUD_GET_MANY_SUCCESS = 'RA/CRUD_GET_MANY_SUCCESS';

// Reference related actions

interface ICrudGetMany {
    type: TypeKeys.CRUD_GET_MANY,
    payload: {
        ids: number[];
    },
    meta: {
        resource: IResource;
        fetch: string; // GET_MANY
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}

export const crudGetMany = (resource: IResource, ids: number[]): ICrudGetMany => ({
    type: TypeKeys.CRUD_GET_MANY,
    payload: { ids },
    meta: {
        resource,
        fetch: GET_MANY,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

// export const CRUD_GET_MATCHING = 'RA/CRUD_GET_MATCHING';
export const CRUD_GET_MATCHING_LOADING = 'RA/CRUD_GET_MATCHING_LOADING';
export const CRUD_GET_MATCHING_FAILURE = 'RA/CRUD_GET_MATCHING_FAILURE';
export const CRUD_GET_MATCHING_SUCCESS = 'RA/CRUD_GET_MATCHING_SUCCESS';

interface ICrudGetMatching {
    type: TypeKeys.CRUD_GET_MATCHING;
    payload: {
        pagination: IPagination;
        sort: ISort;
        filter: IFilter;
    };
    meta: {
        resource: any;
        relatedTo: any;
        fetch: string;
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}

export const crudGetMatching = (
    reference: any,
    relatedTo: any,
    pagination: IPagination,
    sort: ISort,
    filter: IFilter
): ICrudGetMatching => ({
    type: TypeKeys.CRUD_GET_MATCHING,
    payload: { pagination, sort, filter },
    meta: {
        resource: reference,
        relatedTo,
        fetch: GET_LIST,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

// export const CRUD_GET_MANY_REFERENCE = 'RA/CRUD_GET_MANY_REFERENCE';
export const CRUD_GET_MANY_REFERENCE_LOADING =
    'RA/CRUD_GET_MANY_REFERENCE_LOADING';
export const CRUD_GET_MANY_REFERENCE_FAILURE =
    'RA/CRUD_GET_MANY_REFERENCE_FAILURE';
export const CRUD_GET_MANY_REFERENCE_SUCCESS =
    'RA/CRUD_GET_MANY_REFERENCE_SUCCESS';

interface ICrudGetManyReference {
    type: TypeKeys.CRUD_GET_MANY_REFERENCE;
    payload: {
        target: string;
        id: number;
        pagination: IPagination;
        sort: ISort;
        filter: IFilter;
        source: string;
    };
    meta: {
        resource: any;
        relatedTo: number;
        fetch: string;
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}

export const crudGetManyReference = (
    reference: string,
    target: string,
    id: number,
    relatedTo: number,
    pagination: IPagination,
    sort: ISort,
    filter: IFilter,
    source: string
): ICrudGetManyReference => ({
    type: TypeKeys.CRUD_GET_MANY_REFERENCE,
    payload: { target, id, pagination, sort, filter, source },
    meta: {
        resource: reference,
        relatedTo,
        fetch: GET_MANY_REFERENCE,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
});

export type Actions =
    ICrudGetList |
    ICrudGetAll |
    ICrudGetOne |
    ICrudCreate |
    ICrudUpdate |
    ICrudUpdateMany |
    ICrudDelete |
    ICrudDeleteMany |
    ICrudGetMatching |
    ICrudGetMany |
    ICrudGetManyReference;
