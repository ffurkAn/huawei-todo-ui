import React, { Component } from "react";
import { connect } from 'react-redux';
import store from "../store";
import * as CommonActions from '../actions/CommonActions';
import * as RestUtils from '../utils/RestUtil';

class NewListBox extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <div className='popup'>
                <div className='popup_inner'>
                    <label htmlFor="name"></label>
                    <input 
                        name="name"
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps,
    {})(NewListBox)