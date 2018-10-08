const removeKey = (target: Object, path: string): Object =>
    Object.keys(target).reduce((acc, key) => {
        if (key !== path) {
            return Object.assign({}, acc, { [key]: (target as any)[key]});
        }

        return acc;
    }, {});

const deepRemoveKey = (target: Object, path: string): Object => {
    const paths = path.split('.');

    if (paths.length === 1) {
        return removeKey(target, path);
    }

    const deepKey = paths[0];
    const deep = deepRemoveKey((target as any)[deepKey], paths.slice(1).join('.'));

    if (Object.keys(deep).length === 0) {
        return removeKey(target, deepKey);
    }

    return Object.assign({}, target, { [deepKey]: deep });
};

export default deepRemoveKey;
