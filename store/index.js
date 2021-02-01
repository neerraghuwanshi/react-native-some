import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import Thunk from 'redux-thunk'
import { authReducer } from './reducers/auth'
import { homePostReducer } from './reducers/home'
import { userPostReducer } from './reducers/user'
import { profilePostReducer } from './reducers/profile'


reducer = combineReducers({
    auth : authReducer,
    home : homePostReducer,
    user : userPostReducer,
    profile : profilePostReducer
})


export const store = createStore(reducer, applyMiddleware(Thunk))