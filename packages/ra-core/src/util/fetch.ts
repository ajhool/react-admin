import HttpError from './HttpError';
import { stringify } from 'query-string';

interface IJSONOptions {
    headers?: Headers;
    body?: any;
    user?: any;
}

interface IJSONResponse {
    status: number;
    statusText: string;
    headers: Headers;
    body: string;
}

export const fetchJson = (url: string, options: IJSONOptions = {}) => {
    const requestHeaders =
        options.headers ||
        new Headers({
            Accept: 'application/json',
        });
    if (
        !requestHeaders.has('Content-Type') &&
        !(options && options.body && options.body instanceof FormData)
    ) {
        requestHeaders.set('Content-Type', 'application/json');
    }
    if (options.user && options.user.authenticated && options.user.token) {
        requestHeaders.set('Authorization', options.user.token);
    }

    // @ts-ignore options has additional parameters that fetch doesn't recognize. That's okay.
    return fetch(url, { ...options, headers: requestHeaders })
        .then((response: Response): Promise<IJSONResponse> =>
            response.text().then((text: string): IJSONResponse => ({
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text,
            }))
        )
        .then(({ status, statusText, headers, body }: IJSONResponse): any => {
            let json;
            try {
                json = JSON.parse(body);
            } catch (e) {
                // not json, no big deal
            }
            if (status < 200 || status >= 300) {
                return Promise.reject(
                    new HttpError(
                        (json && json.message) || statusText,
                        status,
                        json
                    )
                );
            }
            return { status, headers, body, json };
        });
};

export const queryParameters = stringify;

const isValidObject = (value: Buffer | object | any[]): boolean => {
    if (!value) {
        return false;
    }

    const isArray = Array.isArray(value);
    const isBuffer = typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
    const isObject =
        Object.prototype.toString.call(value) === '[object Object]';
    const hasKeys = !!Object.keys(value).length;

    return !isArray && !isBuffer && isObject && hasKeys;
};

export const flattenObject = (value: any, path = [] as string[]): string[] => {
    if (isValidObject(value)) {
        return Object.assign(
            {},
            ...Object.keys(value).map(key =>
                flattenObject(value[key], path.concat([key]))
            )
        );
    } else {
        return path.length ? { [path.join('.')]: value } : value;
    }
};
