export interface HttpRequestOptions {
    withCredentials?: boolean;
    params?: object;
}

export class HttpRequestOptionsDefaults implements HttpRequestOptions {
    withCredentials = false;
    params: object = undefined;
}