import React, { Component } from "react";
import { connect } from 'react-redux';
import store from "../store";
import * as CommonActions from '../actions/CommonActions';
import * as RestUtils from '../utils/RestUtil';
import '../styles/todo.css';

class NewListBox extends Component {

    constructor(props) {
        super(props);

        this.setState({
            name: ""
        })

    }

    handleChange = event => {
        this.setState({
            name: event.target.value
        });
    }

    save() {
        var postData = {};
        postData['userEmail'] = this.props.loggedInUser;
        postData['name'] = this.state.name;

        store.dispatch(CommonActions.saveNewList(postData));
    }


    render() {

        const { isNewListPopupOpen, closePopup, saveNewList } = this.props;

        return (

            isNewListPopupOpen ?
                <div className='popup'>
                    <div className='popup_inner'>
                        <label htmlFor="name">Name:</label>
                        <input
                            id="txtName"
                            name="name"
                            onChange={this.handleChange}
                        />

                        <button
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
        loggedInUser : state.common.email,
        isNewListPopupOpen: state.todo.isNewListPopupOpen

    }
}

export default connect(mapStateToProps,
    {})(NewListBox)