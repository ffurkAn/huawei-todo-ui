import React, { Component } from "react";
import { connect } from 'react-redux';
import ToDoList from './ToDoList';
import {
    getToDoList,
    setSelectedList
} from "../../actions/CommonActions";

class ToDoItemContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const {listOfToDoList, email, getToDoList, setSelectedList} = this.props;


        return (
            <ToDoList 
                listOfToDoList = { listOfToDoList }
                loggedInUserEmail = { email }
                onLoadToDoList = { getToDoList }
                onSetSelectedList = { setSelectedList }
                selectedListOid = { selectedListOid }
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listOfToDoList : state.todo.listOfToDoList,
        email          : state.common.email,
        selectedListOid    : state.todo.selectedListOid

    }
}

export default connect(mapStateToProps,
    {
        getToDoList,
        setSelectedList
    })(ToDoItemContainer)