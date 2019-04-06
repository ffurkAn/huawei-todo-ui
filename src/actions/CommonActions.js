import * as RestUtil from '../utils/RestUtil';
import * as URI from '../constants/uri';
import store from "../store";


export function signUp(entity, cb){
    RestUtil.fetchPOST(URI.SIGN_UP_URL ,entity, (response) => {
        console.log("new user signedup: " + response.email);
        cb();
    });
}

export function login(entity, cb){
    return dispatch => {
        RestUtil.doLogin(entity, URI.LOGIN_URL, (response) => {
            console.log("logged in");
            dispatch({type: "LOGIN", email: response.email});
            cb()
            
          });
    }
}

export function getToDoList(email, cb){
   return dispatch => {
    RestUtil.fetchPOST(URI.GET_ALL_LIST, {email:email}, (toDoLists) => {
      dispatch({type: "GET_ALL_TODO", listOfToDoList: toDoLists});  
    })
   }
}

export function changeLoginFlag(isRegisteredFlag){
    return dispatch => {
        dispatch({type: "CHANGE_FLAG", isRegisteredFlag: isRegisteredFlag});
    }
}

export function setSelectedList(selectedListOid){
    return dispatch =>{

        dispatch({type: "SELECT_LIST", selectedListOid: selectedListOid})
    }
}

export function onBack(){
    return dispatch =>{
        dispatch({type: "GO_BACK", selectedListOid: undefined})
    }

}

export function showNewListPopup(flag){
    return dispatch =>{
        dispatch({type: "NEW_LIST_POPUP_OPEN", isOpen: flag})
    }
}

export function saveNewList(postData){
    return dispatch => {
        RestUtil.fetchPOST(URI.SAVE_NEW_LIST, postData, () => {
            dispatch({type: "NEW_LIST_POPUP_OPEN", isOpen: false});
            store.dispatch(getToDoList(postData.userEmail));
        })
    }

}