import { combineReducers } from 'redux';
import resources, {
    getResources as resourceGetResources,
    getReferenceResource as resourceGetReferenceResource,
} from './resource';
import loading from './loading';
import notifications from './notifications';
import record from './record';
import references, {
    getPossibleReferenceValues as referencesGetPossibleReferenceValues,
} from './references';
import saving from './saving';
import ui from './ui';
import auth, { isLoggedIn as authIsLoggedIn } from './auth';
import { IState } from './state';

export default combineReducers({
    resources,
    loading,
    notifications,
    record,
    references,
    saving,
    ui,
    auth,
});

export const getPossibleReferenceValues = (state: IState, props) =>
    referencesGetPossibleReferenceValues(state.references, props);

export const getResources = (state: IState) => resourceGetResources(state.resources);

export const getReferenceResource = (state: IState, props) => {
    return resourceGetReferenceResource(state.resources, props);
};

export const isLoggedIn = (state: IState) => authIsLoggedIn(state.auth);

export { getPossibleReferences } from './references';

export { IState };
