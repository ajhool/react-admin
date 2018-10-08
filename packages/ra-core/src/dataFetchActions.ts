export const GET_LIST: string = 'GET_LIST';
export const GET_ONE: string = 'GET_ONE';
export const GET_MANY: string = 'GET_MANY';
export const GET_MANY_REFERENCE: string = 'GET_MANY_REFERENCE';
export const CREATE: string = 'CREATE';
export const UPDATE: string = 'UPDATE';
export const UPDATE_MANY: string = 'UPDATE_MANY';
export const DELETE: string = 'DELETE';
export const DELETE_MANY: string = 'DELETE_MANY';

export const fetchActionsWithRecordResponse = [GET_ONE, CREATE, UPDATE, DELETE];
export const fetchActionsWithArrayOfIdentifiedRecordsResponse = [
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
];
export const fetchActionsWithArrayOfRecordsResponse = [
    ...fetchActionsWithArrayOfIdentifiedRecordsResponse,
    UPDATE_MANY,
    DELETE_MANY,
];
export const fetchActionsWithTotalResponse = [GET_LIST, GET_MANY_REFERENCE];

export type DataFetchActions = 
    GET_LIST |
    GET_ONE |
    GET_MANY |
    GET_MANY_REFERENCES |
    CREATE |
    UPDATE |
    UPDATE_MANY |
    DELETE |
    DELETE_MANY;
