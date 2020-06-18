import store from '../../store';

export class StoreService {
    constructor () {
        if (StoreService.instance) {
            return StoreService.instance;
        }

        StoreService.instance = this;
    }

    /**
     * Commit
     *
     * @param {string} mutation. Mutation name
     * @param {any} payload. Store data
     * @param {string} moduleName. Module name
     * @param {object} commitOptions. Interface:
     */
    set(mutation, payload, moduleName, commitOptions) {
        store.commit(moduleName ? `${moduleName}/${mutation}` : mutation, payload, commitOptions);
    }

    /**
     * Getters
     *
     * @param {string} getter. Store getter name.
     * @param {string} moduleName. Module name, not required
     *
     * @return {any}
     */
    get(getter, moduleName) {
        return store.getters[moduleName ? `${moduleName}/${getter}` : getter];
    }

    /**
     * Dispatch
     *
     * @param {string} action. Store getter name.
     * @param {any} payload. Action with data
     * @param {string} moduleName. Module name, not required
     * @param {object} options. Example: { deep: true } that allows to dispatch root actions in namespaced modules.
     *
     * @return {Promise<any>}
     */
    dispatch(action, payload, moduleName, options) {
        return store.dispatch(moduleName ? `${moduleName}/${action}` : action, payload, options);
    }

    /**
     * Watch
     *
     * @param {function | string} getter. Watch value or Function
     * @param {function} cb. Callback (nv, ov) => {}
     * @param {object} options. Example: { deep: true, immediate: true } like vm.$watch
     *
     * @return {function}
     */
    watch(getter, cb, options) {
        return store.watch(getter, cb, options);
    }

    /**
     * Add module
     *
     * @param {string | Array<string>} path
     * @param {Module} module
     * @param {object} options { preserveState: true } that allows to preserve the previous state.
     */
    addModule(path, module, options) {
        store.registerModule(path, module, options);
    }

    /**
     * Remove module
     *
     * @param {string | Array<string>} path
     */
    removeModule(path) {
        store.unregisterModule(path);
    }

    /**
     * Check has module
     *
     * @param {string | Array<string>} path
     *
     * @return {boolean}
     */
    hasModule(path) {
        return store.hasModule(path);
    }
}
