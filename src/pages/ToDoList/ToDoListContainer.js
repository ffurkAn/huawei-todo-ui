import React, { Component } from "react";
import { connect } from 'react-redux';
import ToDoList from './ToDoList';
import {
    getToDoList,
    setSelectedList,
    onBack,
    showNewListPopup
} from "../../actions/CommonActions";

class ToDoItemContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const {listOfToDoList, email, getToDoList, setSelectedList, selectedListOid, onBack, showNewListPopup, isNewListPopupOpen} = this.props;


        return (
            <ToDoList 
                listOfToDoList = { listOfToDoList }
                loggedInUserEmail = { email }
                onLoadToDoList = { getToDoList }
                onSetSelectedList = { setSelectedList }
                selectedListOid = { selectedListOid }
                onBack = { onBack }
                showNewListPopup = {showNewListPopup}
                isNewListPopupOpen = { isNewListPopupOpen }
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listOfToDoList : state.todo.listOfToDoList,
        email          : state.common.email,
        selectedListOid    : state.todo.selectedListOid,
        isNewListPopupOpen      : state.todo.isNewListPopupOpen

    }
}

export default connect(mapStateToProps,
    {
        getToDoList,
        setSelectedList,
        onBack,
        showNewListPopup
    })(ToDoItemContainer)