import { Localizations }    from './localization';
import * as URI             from '../constants/uri.js';
import { Route, Link } from "react-router-dom";
import React from "react";


export function checkHttpStatus(response, responseJson, isLogin) {

    if (response.status >= 200 && response.status < 300) {
        return responseJson;
    } else {
        return responseJson.then(res => {
            if (res.message && res.message.indexOf('Invalid token') >= 0) {
                //console.log(Localizations.SESSION_STATUS, Localizations.SESSION_TIMEOUT, Constants.ALERT_ERROR);
                return <Route path='/login' />
                
            } else if (res.error === "Unauthorized" || res.message === "Access is denied") {
                return <Route path='/home' />
                const err = new Error('');
                err.status = res.status;
                err.code = res.code;
                err.message = Localizations.YOU_DONT_HAVE_PRIVILEGE;
                throw err;
                
            } else if (res.error && res.message !== "As your role has been changed, you need to login to e-YKS again") {
                //console.log(Localizations.UNEXPECTED_ERROR, res.error + '\n' + res.message, Constants.ALERT_ERROR);
                throw res.error;

            } else if(res.code === 'ER078') {
                return <Route path='/login' />
                const err = new Error('');
                err.status = res.status;
                err.code = "ER078";
                err.message = Localizations.ER078;
                throw err;
            }
            else {
                const err = new Error('');
                err.status = res.status;
                err.code = res.code;
                err.message = res.message; //fromParameter(error.code)
                //console.log(Localizations.UNEXPECTED_ERROR, err.message, Constants.ALERT_ERROR);
                alert("HATA! - " + JSON.stringify(res));
                console.log("HATA! - " + JSON.stringify(res));
                throw err;
            }
        })
    }
}

export function doLogin(body, url, cb) {
    if (!body || body.length == 0) {
       // console.log(Localizations.LoginPageAppBarTitle, Localizations.MSG_INVALID_PASSWORD, Constants.ALERT_ERROR);
    } else {
        //App.loader('show');

 
            fetch(url,  {
                    method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                    }, body: JSON.stringify(body)
                }
            )
                .then(format)
                .then(({response, responseJson}) => checkHttpStatus(response, responseJson, true))
                .then(isLoggedIn => {
                    // store.dispatch(CommonActions.changeIsLoggedIn(true));
                    //App.loader('hide');
                    cb(isLoggedIn);
                })
                .catch(error => {
                    console.error(error);
                    //App.loader('hide');
                });
       

    }
}

export function doLogout(cb) {
    //fetchPOST(URI.LOGOUT, {}, cb);
}

export function fetchGET(url, cb, showLoader=true) {
    if (showLoader)
        //App.loader('show');
    fetch(url, GET())
        .then(format)
        .then(({response, responseJson}) => checkHttpStatus(response, responseJson, true))
        .then((responseJson) => {
            cb(responseJson);
            if (showLoader)
               // App.loader('hide');
            return responseJson;
        })
        .catch((error) => {
            if (showLoader)
               // App.loader('hide');
               alert("HATA: " + error.code + ' / ' + error.message);
               console.log("HATA: " + error.code + ' / ' + error.message);
        });
}

export function fetchPOST(url, body, cb) {
    //App.loader('show');

    fetch(url, POST(body))
        .then(format)
        .then(({response, responseJson}) => checkHttpStatus(response, responseJson, true))
        .then((responseJson) => {
            cb(responseJson);
            //App.loader('hide');
            return responseJson;
        })
        .catch((error) => {
           // App.loader('hide');
            alert("HATA: " + error.code + ' / ' + error.message);
            console.log("HATA: " + error.code + ' / ' + error.message);
        });
}

export function fetchPOSTWithoutToken(url, body, cb) {
    //App.loader('show');
    fetch(url, POSTWithoutToken(body))
        .then(format)
        .then(({response, responseJson}) => checkHttpStatus(response, responseJson, true))
        .then((responseJson) => {
            cb(responseJson);
            //App.loader('hide');
            return responseJson;
        })
        .catch((error) => {
           // App.loader('hide');
            error.message = Localizations[error.code];
            //console.log(Localizations.UNEXPECTED_ERROR, error.code + ' / ' + error.message, Constants.ALERT_ERROR);
        });
}


export function fetchGETCached(url, cb) {
    fetch(url, GET())
        .then((response) => response.json())
        .then((responseJson) => {
            cb(responseJson)
            return responseJson;
        })
        .catch((error) => {
            cb(error)
        });
}


export function fetchPOSTForm(url, body, cb) {
    fetch(url, POSTForm(body))
        .then((response) => response.json())
        .then((responseJson) => {
            cb(responseJson)
            return responseJson;
        })
        .catch((error) => {
            cb(error)
        });
}

export function fetchDELETE(url, body = {}, cb = function() {}) {
    fetch(url, DELETE(body))
        .then(format)
        .then(({response, responseJson}) => checkHttpStatus(response, responseJson, true))
        .then((responseJson) => {
            cb(responseJson)
            return responseJson;
        })
        .catch((error) => {
            cb(error)
        });
}



export const GET = () => {
    return {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        }
    }
}

export const POST = (body) => {
    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        }, body: JSON.stringify(body)
    }
}
export const POSTForCustomReturn = (returnType, body) => {
    return {
        method: 'POST',
        headers: {
            'Accept': returnType,
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }, body: JSON.stringify(body)
    }
}
export const POSTWithoutToken = (body) => {
    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify(body)
    }
}
export const POSTForm = (body) => {
    return {
        method: 'POST',
        headers: {
            //'Accept': 'application/json',
            //'Content-Type': 'multipart/form-data',
            //'Content-Type':'application/json',
            'Content-Type': 'multipart/form-data; boundary=------',
            'Authorization': localStorage.getItem('token')
        }, body: JSON.stringify(body)
    }
}


export const PUT = (body) => {
    return {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }, body: JSON.stringify(body)
    }
}

export const DELETE = (body = {}) => {
    return {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }, body: JSON.stringify(body)
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export function lookupify(data, keyId, textId) {
    let list = [];
    if (data)
        for (var i = 0; i < data.length; i++)
            list.push({key: data[i][keyId], text: data[i][textId]});
    return list;
}

function format(response) {
    const responseJson = response.json();
    return {response, responseJson};
}