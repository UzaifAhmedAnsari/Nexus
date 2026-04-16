const API_BASE = '/api/v1';

async function request(path) {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: {
            Accept: 'application/json',
        },
    });


    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.error?.message || 'Request failed');
    }

    return data;
}

export function getBootstrapData(){
    return request('/system/bootstrap');
}

export function getHealthData() {
    return request('/health');
}

export function getUsers() {
    return request('/users');
}

export function getWorkspaces() {
    return request('/workspaces');
}