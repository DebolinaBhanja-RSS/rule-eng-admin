import { ruleHttpClient } from "../DataProvider/MainDataProvider";

const namespace = 'http://localhost:8081/rule-admin/rule-namespace'

export default {

    getList: () => {
        const url = `${namespace}}`;

        return ruleHttpClient(url).then(({ json }) => ({
            data: json,
            total: json.totalElements,
        }));
    },

};