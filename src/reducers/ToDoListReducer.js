import Immutable from 'immutable';


const initialState = { listOfToDoList: [] }

export const todo = (state = initialState, action) => {

    switch (action.type) {

        case "GET_ALL_TODO":
            return Immutable.Map(state).set('listOfToDoList', action.listOfToDoList).toJS();
            break;

        case "SELECT_LIST":
            return Immutable.Map(state).set('selectedListOid', action.selectedListOid).toJS();
            break;

        case "GO_BACK":
            return Immutable.Map(state).set('selectedListOid', action.selectedListOid).toJS();
            break;
            
        default:
            return state;
    }
}