import { crudGetMany, crudGetMatching, ICrudGetMatching } from './dataActions';
import { IResource } from './resourcesActions';
import { IPagination, ISort, IFilter } from '../reducer/admin/resource/list/queryReducer';

export enum AccumulateTypeKeys {
    CRUD_GET_MANY_ACCUMULATE = 'RA/CRUD_GET_MANY_ACCUMULATE',
    CRUD_GET_MATCHING_ACCUMULATE = 'RA/CRUD_GET_MATCHING_ACCUMULATE',
}

// export const CRUD_GET_MANY_ACCUMULATE = 'RA/CRUD_GET_MANY_ACCUMULATE';
export interface ICrudGetManyAccumulate {
    type: AccumulateTypeKeys.CRUD_GET_MANY_ACCUMULATE,
    payload: { resource: IResource, ids: number[] },
    meta: { accumulate: typeof crudGetMany },
}

export const crudGetManyAccumulate = (resource: IResource, ids: number[]): ICrudGetManyAccumulate => ({
    type: AccumulateTypeKeys.CRUD_GET_MANY_ACCUMULATE,
    payload: { resource, ids },
    meta: { accumulate: crudGetMany },
});

// export const CRUD_GET_MATCHING_ACCUMULATE = 'RA/CRUD_GET_MATCHING_ACCUMULATE';

interface ICrudGetMatchingAccumulate {
    type: AccumulateTypeKeys.CRUD_GET_MATCHING_ACCUMULATE;
    meta: {
        accumulate: () => ICrudGetMatching;
        accumulateValues: () => true;
        accumulateKey: string;
    }
}

export const crudGetMatchingAccumulate = (
    reference: string,
    relatedTo: string[],
    pagination: IPagination,
    sort: ISort,
    filter: IFilter
): ICrudGetMatchingAccumulate => {
    const action = crudGetMatching(
        reference,
        relatedTo,
        pagination,
        sort,
        filter
    );

    return {
        type: AccumulateTypeKeys.CRUD_GET_MATCHING_ACCUMULATE,
        meta: {
            accumulate: () => action,
            accumulateValues: () => true,
            accumulateKey: JSON.stringify({
                resource: reference,
                ...action.payload,
            }),
        },
    };
};

export type AccumulateActions  = ICrudGetManyAccumulate | ICrudGetMatchingAccumulate;