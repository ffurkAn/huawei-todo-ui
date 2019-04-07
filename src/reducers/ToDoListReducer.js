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

        case "NEW_LIST_POPUP_OPEN":
            return Immutable.Map(state).set('isNewListPopupOpen', action.isOpen).toJS();
            break;

        case "NEW_ITEM_POPUP_OPEN":
            return Immutable.Map(state).set('isNewItemPopupOpen', action.isOpen).toJS();
            break;


        default:
            return state;
    }
}