import Immutable from 'immutable';


const initialState = {
    email: "ffurkan.tanriverdi@gmail.com",
    password: "",
    isRegistered: true
}

export const common = (state = initialState, action) => {

    switch (action.type) {

        case "LOGIN":
            return Immutable.Map(state).set('email', action.email).toJS();
            break;

        case "CHANGE_FLAG":
            return Immutable.Map(state).set('isRegisteredFlag', action.isRegisteredFlag).toJS();
            break

        default:
            return state;
    }
}