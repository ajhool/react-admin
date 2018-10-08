import { get } from 'lodash';

export default (value: Object, path: Array<string> | string) => {
    if (typeof value === 'object') {
        return get(value, path);
    }

    return value;
};
