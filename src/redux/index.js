import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { postReducer } from "./ducks/postDuck"

const rootReducer = combineReducers({
    post: postReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))