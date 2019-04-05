import { browserHistory }           from 'react-router';

export const LIST                   = '/list';
export const LOGIN                  = '/login';


export const goto = (path) => {browserHistory.push(path)};