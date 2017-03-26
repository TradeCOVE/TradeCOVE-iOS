import UserStore from './UserStore';
import APIStore from './APIStore';

class AppState {
    user = null;
    api = null;
    host = null;
    createDataStores(props = {}) {
        this.host = props.appState.apiUrl;
        this.api = new APIStore({ base: props.appState.apiUrl });
        this.user = new UserStore(this, props.appState.userId);
    }
}

export default new AppState();
