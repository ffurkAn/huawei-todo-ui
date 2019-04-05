import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import logger from "redux-logger";
import { reducer as formReducer } from "redux-form";
import { todo } from './reducers/ToDoListReducer';
import { common} from './reducers/CommonReducer';


const appReducer = combineReducers({
    form: formReducer,
    todo,
    common

})

export default createStore(
    appReducer,
    {},
    applyMiddleware(logger, thunk, promise)
);