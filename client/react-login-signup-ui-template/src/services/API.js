import axios from 'axios'
import store from '../store/store';

export default () => {
    // grab current state
    const state = store.getState();
    // get the JWT token out of it
    // (obviously depends on how your store is structured)
    const authToken = state.token;

    return axios.create({
        baseURL: 'http://192.168.43.30:5000/api/',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
}
