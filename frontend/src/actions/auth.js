import * as api from '../services/partyService.js';

export const login = (userData , router) => async (dispatch) => {
    try {
        const {data} = await api.login(userData);
        
        if(data.status === 'error'){
            alert(data.message);
        } else {
            dispatch({type : 'AUTH', data});
            router('/')
        }

    } catch (err) {
        console.log(err);
    }
}

export const signup = (userData , router ) => async (dispatch) => {
    try {
        const {data} = await api.signup(userData);
        
        if( data.status === 'error'){
            alert(data.message);
        } else{
            dispatch({type : 'AUTH', data});
            router('/');
        }
        
    } catch (err) {
        console.log(err);
    }
}