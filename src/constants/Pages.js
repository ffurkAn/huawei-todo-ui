import { BrowserHistory }           from 'react-router-dom';

export const HOME                   = '/home';
export const LOGIN                  = '/login';


export const goto = (path) => {BrowserHistory.push(path)};