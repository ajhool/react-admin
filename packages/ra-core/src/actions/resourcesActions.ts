export const REGISTER_RESOURCE = 'RA/REGISTER_RESOURCE';
export const UNREGISTER_RESOURCE = 'RA/UNREGISTER_RESOURCE';

// TODO: Not sure what this represents.
export type IResource = any;

export const registerResource = (resource: IResource) => ({
    type: REGISTER_RESOURCE,
    payload: resource,
});

export const unregisterResource = (resourceName: string) => ({
    type: UNREGISTER_RESOURCE,
    payload: resourceName,
});
