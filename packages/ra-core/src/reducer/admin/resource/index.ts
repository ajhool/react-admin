import { REGISTER_RESOURCE, UNREGISTER_RESOURCE, ResourcesActions, IResourcesPayload } from '../../../actions';

import data from './data';
import list from './list';

export interface IState {
    [name: string]: {
        props: any;
        data: any;
        list: any;
    }
    props?: typeof IResourcesPayload;
    data?: any; //data(undefined, action)
    list?: any; //list(undefined, action)
}

const initialState = {};

export default (previousState: IState = initialState, action: ResourcesActions) => {
    if (action.type === REGISTER_RESOURCE) {
        const resourceState = {
            props: action.payload,
            data: data(undefined, action),
            list: list(undefined, action),
        };
        const newState = {
            ...previousState,
            [action.payload.name]: resourceState,
        };

        return newState;
    }

    if (action.type === UNREGISTER_RESOURCE) {
        const newState = Object.keys(previousState).reduce((acc, key) => {
            if (key === action.payload) {
                return acc;
            }

            return { ...acc, [key]: previousState[key] };
        }, {});
        return newState;
    }

    if (!action.meta || !action.meta.resource) {
        return previousState;
    }

    const resources = Object.keys(previousState);
    const newState = resources.reduce(
        (acc, resource) => ({
            ...acc,
            [resource]:
                action.meta.resource === resource
                    ? {
                          props: previousState[resource].props,
                          data: data(previousState[resource].data, action),
                          list: list(previousState[resource].list, action),
                      }
                    : previousState[resource],
        }),
        {}
    );

    return newState;
};

export const getResources = (state: IState) =>
    Object.keys(state).map(key => state[key].props);

export const getReferenceResource = (state: IState, props) => state[props.reference];
