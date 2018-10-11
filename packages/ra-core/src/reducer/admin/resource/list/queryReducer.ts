export const SET_SORT = 'SET_SORT';
export const SORT_ASC = 'ASC';
export const SORT_DESC = 'DESC';

export const SET_PAGE = 'SET_PAGE';
export const SET_PER_PAGE = 'SET_PER_PAGE';

export const SET_FILTER = 'SET_FILTER';

export enum SORT_DIRECTION {
    SORT_ASC = 'ASC',
    SORT_DESC = 'DESC',
}

export interface IPagination {
    page: number;
    perPage: number;
}

export interface ISort {
    field: string;
    order: SORT_DIRECTION;
}

export interface IFilter {
    [field: string]: any;
}

const oppositeOrder = (direction: SORT_DIRECTION) =>
    direction === SORT_DESC ? SORT_ASC : SORT_DESC;

interface IState {
    order: SORT_DIRECTION;
    page: number;
    sort: ISort;
    perPage: number;
    filter: IFilter;
}

// I would rather use an enum here, but I'm not sure how the constant strings are called in other parts of the app.
interface ISetSortAction {
    type: typeof SET_SORT;
    payload: ISort;
}
//| typeof SORT_ASC | typeof SORT_DESC | typeof SET_PAGE | typeof SET_PER_PAGE | typeof SET_FILTER;
interface ISetPageAction {
    type: typeof SET_PAGE;
    payload: number;
}

interface ISetPerPageAction {
    type: typeof SET_PER_PAGE;
    payload: number;
}

interface ISetFilter {
    type: typeof SET_FILTER;
    payload: IFilter;
}

export type QueryActions = ISetSortAction | ISetPageAction | ISetPerPageAction | ISetFilter;

/**
 * This reducer is for the react-router query string, NOT for redux.
 */
export default (previousState: IState, { type, payload }: QueryActions ) => {
    switch (type) {
        case SET_SORT:
            // TODO: Typescript exposed perPage and filter errors.
            if (payload === previousState.sort) {
                return {
                    ...previousState,
                    order: oppositeOrder(previousState.order),
                    page: 1
                };
            }

            return {
                ...previousState,
                sort: payload,
                order: SORT_ASC,
                page: 1,
            };

        case SET_PAGE:
            return { ...previousState, page: payload };

        case SET_PER_PAGE:
            return { ...previousState, perPage: payload };

        case SET_FILTER: {
            return { ...previousState, page: 1, filter: payload };
        }

        default:
            return previousState;
    }
};
