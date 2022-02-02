import axios from 'axios';

const url = 'http://localhost:5000/';

export const getParties = () => axios.get(url);

export const createParty = (newParty) => { axios.post(url, newParty) };


export const deleteParty = (id) => axios.delete(`${url}${id}`);


export const joinParty = (id) => axios.patch(`${url}join/${id}`);