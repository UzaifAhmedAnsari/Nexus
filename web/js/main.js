import {getBootstrapData, getHealthData } from './services/api.js';
import {state, setState} from './store/app-store.js';
import { renderApp } from './ui/render.js';



async function loadBootstrap() {
    try {
        setState({loading: true, error: null});
        const data = await getBootstrapData();
        setState({bootstrap: data, loading: false});
    } catch (error) {
        setState({error: error.message, loading: false});
    }
}


async function loadHealth() {
    try {
        setState({loading: true, error: null});
        const data = await getHealthData();
        setState({health: data, loading: false});
    } catch (error) {
        setState({error: error.message, loading: false});
    }
}


function bindEvents() {
    document.querySelector('#load-bootstrap-btn').addEventListener('click', loadBootstrap);
    document.querySelector('#check-health-btn').addEventListener('click', loadHealth);

    document.addEventListener('app:state-changed', (event) => {
        renderApp(event.detail);
    })
}

async function init() {
    bindEvents();
    renderApp(state);
    await loadBootstrap();
}

init();