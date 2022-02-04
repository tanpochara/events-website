import * as api from '../services/partyService.js';

export const getParties = () => async (dispatch) =>{
    try {
        const { data } = await api.getParties();

        dispatch ({type : 'FETCH_ALL', payload: data});

    } catch (err) {
        console.log(err);
    }

};

export const createParty = (party) => async (dispatch) => {
    try {
        
        const { data } = await api.createParty(party);

        dispatch({type : 'CREATE' , payload : data})
    } catch (err) {
        console.log(err);
    }
}

export const deleteParty = (id) => async (dispatch) => {
    try {
        api.deleteParty(id);

        dispatch({type: 'DELETE' , payload : id})
    } catch (err) {
        console.log(err);
    }
}

export const joinParty = (id) => async (dispatch) => {
    try {
        const { data }  = await api.joinParty(id);

        dispatch({type: 'UPDATE' , payload : data});
    } catch (err) {
        console.log(err);
    }
}