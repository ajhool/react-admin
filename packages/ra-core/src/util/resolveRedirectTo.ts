import linkToRecord from './linkToRecord';

type RedirectFunc = (basePath: string, id: string | number, data?: any) => string;

type RedirectTo = 'list' | 'create' | 'edit' | 'show' | string | RedirectFunc;

export default (redirectTo: RedirectTo, basePath: string, id: number, data?: string) => {
    if (typeof redirectTo === 'function') {
        return redirectTo(basePath, id, data);
    }
    switch (redirectTo) {
        case 'list':
            return basePath;
        case 'create':
            return `${basePath}/create`;
        case 'edit':
            return linkToRecord(basePath, id);
        case 'show':
            return `${linkToRecord(basePath, id)}/show`;
        default:
            return redirectTo;
    }
};
