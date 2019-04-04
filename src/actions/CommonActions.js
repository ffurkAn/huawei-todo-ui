import * as RestUtil from '../utils/RestUtil';
import * as URI from '../constants/uri';

export function signUp(entity){
    RestUtil.fetchPOST(URI.SIGN_UP_URL ,entity, (response) => {
        console.log("new user signedup: " + response.email);
    });
}

export function login(entity){
    RestUtil.doLogin(entity, URI.LOGIN_URL, (response) => {
        console.log("logged in");
      });
}