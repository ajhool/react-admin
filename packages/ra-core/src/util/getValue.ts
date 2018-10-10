import { get } from 'lodash';

export default (value: object, path: string[] | string) => {
    if (typeof value === 'object') {
        return get(value, path);
    }

    return value;
};
