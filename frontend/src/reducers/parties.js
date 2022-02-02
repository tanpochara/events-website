export const parties = (parties = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...parties , action.payload];
        case 'UPDATE':
            return parties.map((party) => party._id === action.payload._id ? action.payload : party);
        case 'DELETE':
            return parties.filter((post) => post._id !== action.payload);
        default:
            return parties;
    }
}

