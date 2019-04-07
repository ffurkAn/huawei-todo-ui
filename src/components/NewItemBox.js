import React, { Component } from "react";
import { connect } from 'react-redux';
import store from "../store";
import * as CommonActions from '../actions/CommonActions';
import * as RestUtils from '../utils/RestUtil';
import '../styles/todo.css';

class NewItemBox extends Component {

    constructor(props) {
        super(props);

        this.setState({
            name: "",
            description: "",
            deadline: "",
            status: "UNDONE"
        })

    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    save() {
        var postData = {};
        postData['toDoListOid'] = this.props.selectedListOid;
        postData['name'] = this.state.name;
        postData['description'] = this.state.description;
        postData['deadline'] = this.state.deadline;
        postData['status'] = this.state.status;
        postData['userEmail'] = this.props.loggedInUser;

        store.dispatch(CommonActions.saveNewItem(postData));
    }


    render() {

        const { isNewItemPopupOpen, closePopup, saveNewItem } = this.props;

        return (

            isNewItemPopupOpen ?
                <div className='popup'>
                    <div className='popup_inner'>
                        <label htmlFor="name">Name:</label>
                        <input
                            id="txtName"
                            name="name"
                            onChange={this.handleChange}
                        />

                        <label htmlFor="name">description:</label>
                        <input
                            id="txtDesc"
                            name="description"
                            onChange={this.handleChange}
                        />

                        <label htmlFor="name">deadline:</label>
                        <input
                            id="dtDeadline"
                            name="deadline"
                            type="date"
                            onChange={this.handleChange}
                        />

                        <button
                            id="btnSaveItem"
                            onClick={() => this.save()}
                            type="button"
                        >Save</button>

                        <button
                            onClick={closePopup}
                            type="button"
                        >Close</button>
                    </div>
                </div>
                :

                null

        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.common.email,
        selectedListOid: state.todo.selectedListOid,
        isNewItemPopupOpen: state.todo.isNewItemPopupOpen

    }
}

export default connect(mapStateToProps,
    {})(NewItemBox)