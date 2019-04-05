import React, { Component } from "react";
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import {
    login,
    signUp,
    changeLoginFlag
} from "../../actions/CommonActions";

class LoginContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){

        const {signUp, email, login, isRegisteredFlag, changeLoginFlag} = this.props;


        return (
            <LoginForm 
                onSignUp = { signUp }
                loggedInUserEmail = { email }
                onLogin = { login }
                onFlagChanged = { changeLoginFlag }
                isRegisteredFlag = { isRegisteredFlag }
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email          : state.common.email,
        isRegisteredFlag: state.common.isRegisteredFlag

    }
}

export default connect(mapStateToProps,
    {
        login,
        signUp,
        changeLoginFlag
    })(LoginContainer)