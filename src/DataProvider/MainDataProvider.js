import { fetchUtils, combineDataProviders } from 'react-admin';
import Rule_InputSegmentDataProvider from '../DataProvider/Rule_InputSegmentDataProvider';
import DataProvider from './DataProvider';

export const ruleHttpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    options.headers.set('X-USER-ID', '1');
    return fetchUtils.fetchJson(url, options);
}

export const mainDataProvider = combineDataProviders((resource) => {
    switch (resource) {
        case 'rule':
            return DataProvider;
        case 'inputsegment':
            return Rule_InputSegmentDataProvider;
        default:
            throw new Error(`Unknown resource: ${resource}`);
    }
});
