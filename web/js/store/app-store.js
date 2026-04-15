export const state = {
    bootstrap: null,
    health: null,
    loading: null,
    error:null,
};


export function setState(patch) {
    Object.assign(state, patch);

    document.dispatchEvent(
        new CustomEvent('app:state-changed', {
            detail: structuredClone(state),
        }),
    );
}