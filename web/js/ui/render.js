function formatJson(value) {
    return JSON.stringify(value, null, 2);
}

export function renderApp(state) {
    const statusEl = document.querySelector('#status');
    const bootstrapEl = document.querySelector('#bootstrap-output');
    const healthEl = document.querySelector('#health-output');
    const usersEl = document.querySelector('#users-output');
    const workspacesEl = document.querySelector('#workspaces-output');


    const statusType = state.error? 'error' : 'ok';
    const statusLabel = state.loading
    ? 'Loading...'
    : state.error
    ? `Error: ${state.error}`
    : 'Ready';


    statusEl.innerHTML = `
    <div class= "status-badge">
    <span class="status-dot ${statusType}"></span>
    <span>${statusLabel}</span>
    </div>
    `;

    if (state.bootstrap) {
        bootstrapEl.textContent = formatJson(state.bootstrap)
    }

    if (state.health) {
        healthEl.textContent = formatJson(state.health)
    }

    if (state.users) {
        usersEl.textContent = formatJson(state.users)
    }

    if (state.workspaces) {
        workspacesEl.textContent = formatJson(state.workspaces)
    }

}