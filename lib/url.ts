import qs, { StringifiableRecord } from 'query-string'

export const addQueryParams = (url: string, params?: object) => {
    return qs.stringifyUrl({ url, query: params as StringifiableRecord })
}
