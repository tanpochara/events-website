import * as api from '../services/partyService.js';

export const login = (userData , router) => async (dispatch) => {
    try {
        const {data} = await api.login(userData);

        dispatch({type : 'AUTH', data});

        router('/')
    } catch (err) {
        console.log(err);
    }
}

export const signup = (userData , router ) => async (dispatch) => {
    try {
        const {data} = await api.signup(userData);

        dispatch({type : 'AUTH', data});

        router('/');
    } catch (err) {
        console.log(err);
    }
}