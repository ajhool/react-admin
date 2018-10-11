import {
    DataActions,
    DataTypeKeys
} from '../../../actions/dataActions';

export type RelatedTo = string | { error: Error};

export interface IState {
    [relatedTo: string]: RelatedTo;
}

const initialState = {};

export default (previousState: IState = initialState, action: DataActions) => {
    switch (action.type) {
        case DataTypeKeys.CRUD_GET_MATCHING_SUCCESS:
            return {
                ...previousState,
                [action.meta.relatedTo]: action.payload.data.map(record => record.id),
            };
        case DataTypeKeys.CRUD_GET_MATCHING_FAILURE:
            return {
                ...previousState,
                [action.meta.relatedTo]: { error: action.payload.error },
            };
        default:
            return previousState;
    }
};

export const getPossibleReferenceValues = (state: IState, props) =>
    state[props.referenceSource(props.resource, props.source)];

export const getPossibleReferences = (
    referenceState,
    possibleValues,
    selectedIds = [] as number[]
) => {
    if (!possibleValues) {
        return null;
    }

    if (possibleValues.error) {
        return possibleValues;
    }
    possibleValues = Array.from(possibleValues);
    selectedIds.forEach(
        id =>
            possibleValues.some(value => value == id) ||
            possibleValues.unshift(id)
    );
    return possibleValues
        .map(id => referenceState.data[id])
        .filter(r => typeof r !== 'undefined');
};
