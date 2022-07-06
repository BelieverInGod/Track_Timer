import { combineReducers, createStore } from 'redux'
import trackerReducer from './trackerReducer'

let reducers = combineReducers({
    trackerList: trackerReducer
})

let store = createStore(reducers);

export default store