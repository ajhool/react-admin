export default (basePath: string, id: string | number, linkType = 'edit'): string => {
    let link = `${basePath}/${encodeURIComponent(`${id}`)}`;

    if (linkType === 'show') {
        return `${link}/show`;
    }

    return link;
};
