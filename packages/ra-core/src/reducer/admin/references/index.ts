import { combineReducers } from 'redux';
import oneToMany, { IState as IOneToManyState } from './oneToMany';
import possibleValues, {
    getPossibleReferences as pvGetPossibleReferences,
    getPossibleReferenceValues as pvGetPossibleReferenceValues,
    IState as IPossibleValueState,
} from './possibleValues';

export interface IState {
    readonly oneToMany: IOneToManyState;
    readonly possibleValues: IPossibleValueState
}

export default combineReducers({
    oneToMany,
    possibleValues,
});

export const getPossibleReferenceValues = (state: IState, props) =>
    pvGetPossibleReferenceValues(state.possibleValues, props);

export const getPossibleReferences = pvGetPossibleReferences;
