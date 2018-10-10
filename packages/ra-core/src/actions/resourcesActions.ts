// export const REGISTER_RESOURCE = 'RA/REGISTER_RESOURCE';
// export const UNREGISTER_RESOURCE = 'RA/UNREGISTER_RESOURCE';

// TODO: Not sure what this represents.
export type IResource = any;

export enum TypeKeys {
    REGISTER_RESOURCE = 'RA/REGISTER_RESOURCE',
    UNREGISTER_RESOURCE = 'RA/UNREGISTER_RESOURCE',
}

export interface IRegisterResource {
    type: TypeKeys.REGISTER_RESOURCE,
    payload: IResource,
}

export const registerResource = (resource: IResource) => ({
    type: TypeKeys.REGISTER_RESOURCE,
    payload: resource,
});

export interface IUnregisterResource {
    type: TypeKeys.UNREGISTER_RESOURCE,
    payload: string,
}

export const unregisterResource = (resourceName: string): IUnregisterResource => ({
    type: TypeKeys.UNREGISTER_RESOURCE,
    payload: resourceName,
});

export type Actions = IRegisterResource | IUnregisterResource;
