import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "../../styles/table-basic.css";
import { Form, Field, reduxForm, change } from "redux-form";
import NewListBox from "../../components/NewListBox";
import NewItemBox from "../../components/NewItemBox";



class ToDoList extends Component {

    constructor(props) {
        super(props);

        this.goToItems = this.goToItems.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.addNewList = this.addNewList.bind(this);


    }

    componentDidMount() {
        this.props.onLoadToDoList(this.props.loggedInUserEmail);
    }

    goToItems(listObjId) {

        this.props.onSetSelectedList(listObjId);

        //this.props.onSelectedList(listObjId);
    }

    addNewList() {
        this.props.showNewListPopup(true);
    }

    togglePopup() {
        this.props.showNewListPopup(false);
    }

    addNewItem() {
        this.props.showNewItemPopup(true);
    }

    toggleItemPopup(){
        this.props.showNewItemPopup(false);
    }

    render() {

        const { listOfToDoList, selectedListOid, onBack, isNewListPopupOpen } = this.props;

        return (
            selectedListOid ?

                <div>
                    <h1>{listOfToDoList.filter((listItem, i) => selectedListOid === listItem.objId)[0].name}</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listOfToDoList.filter((listItem, i) => selectedListOid === listItem.objId)[0].items.map((toDoItem, i) => {

                                    return <tr key="i">
                                        <td style={{ display: "none" }}>
                                            {toDoItem.objId}
                                        </td>
                                        <td>
                                            {toDoItem.name}
                                        </td>
                                        <td>
                                            {toDoItem.description}
                                        </td>
                                        <td>
                                            {toDoItem.deadline}
                                        </td>
                                        <td>
                                            {toDoItem.status === 'Y' ? 'DONE' : 'UNDONE'}
                                        </td>
                                        <td>
                                            <button
                                                name="btnAddItem"
                                                type="button"
                                                onClick={() => { }}
                                            >
                                                Mark as Done!
                                        </button>

                                        </td>

                                        <td>
                                            <button
                                                name="btnDeleteItem"
                                                type="button"
                                                onClick={() => { }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>

                    <button
                        name="btnBack"
                        onClick={onBack}
                    >
                        Back
                    </button>
                    <button
                        name="btnAddNewItem"
                        onClick={() => this.addNewItem()}
                    >
                        Add New Item
                    </button>
                    <NewItemBox
                        closePopup={() => this.toggleItemPopup()}
                    >
                    </NewItemBox>
                </div>
                :

                <div>
                    <h1>TO-DO LISTS</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listOfToDoList.map((listItem, i) => {

                                    return <tr key="i">
                                        <td style={{ display: "none" }}>
                                            {listItem.objId}
                                        </td>
                                        <td>
                                            {listItem.name}
                                        </td>
                                        <td>
                                            <button
                                                id="btnAddItem"
                                                type="button"
                                                onClick={() => { this.goToItems(listItem.objId); }}
                                            >
                                                See Items
                                        </button>

                                        </td>

                                        <td>
                                            <button
                                                name="btnDeleteItem"
                                                type="button"
                                                onClick={() => { }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>
                    <button
                        name="btnAddNewItem"
                        onClick={() => this.addNewList()}
                    >
                        Add New List
                    </button>

                    <NewListBox
                        closePopup={() => this.togglePopup()}
                    >
                    </NewListBox>

                </div>
        )
    }
}

export default reduxForm({
    form: "toDoListForm",
    enableReinitialize: true
})(ToDoList)