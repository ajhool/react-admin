import { combineReducers } from 'redux';
import ids, { IState as IIdsState } from './ids';
import params, { IState as IParamsState } from './params';
import selectedIds, { IState as ISelectedIdsState } from './selectedIds';
import total, { IState as ITotalState } from './total';

export default combineReducers({
    ids,
    params,
    selectedIds,
    total,
});

export interface IState {
    ids: IIdsState;
    params: IParamsState;
    selectedIds: ISelectedIdsState;
    total: ITotalState;
}
