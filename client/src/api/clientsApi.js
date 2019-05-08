export default class clientsApi {
    static createOne(data) {
        return fetch('/api/crud/client', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    static deleteOne(appId) {
        return fetch(`/api/crud/client/${appId}`, {
            method: 'delete'
        });
    }
    static updateOne(data) {
        return fetch(`/api/crud/client`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    static getAllApps(isDaily = true, pageNum = 1) {
        return fetch(`/api/crud/client/report/by-date/${pageNum}/${isDaily}`);
    }
}