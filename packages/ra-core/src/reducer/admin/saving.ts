import { actionTypes } from 'redux-form';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
    Actions as IDataActions,
    TypeKeys as DataTypeKeys
} from '../../actions/dataActions';

export type IState = boolean;

interface ILocationChange {
    type: typeof LOCATION_CHANGE
}

// TODO: HMMM .. need to add typings for CREATE_SUCCESS and CREATE_FAILURE, which are not immediately obvious in dataActions. 

export default (previousState: boolean = false, action: IDataActions | ILocationChange) => {
    switch (action.type) {
        case DataTypeKeys.CRUD_CREATE:
        case DataTypeKeys.CRUD_UPDATE:
            return {
                redirect: action.meta.onSuccess && action.meta.onSuccess.redirectTo,
            };
        case LOCATION_CHANGE:
        case actionTypes.SET_SUBMIT_FAILED:
        case DataTypeKeys.CRUD_CREATE_SUCCESS:
        case DataTypeKeys.CRUD_CREATE_FAILURE:
        case DataTypeKeys.CRUD_UPDATE_SUCCESS:
        case DataTypeKeys.CRUD_UPDATE_FAILURE:
            return false;
        default:
            return previousState;
    }
};
