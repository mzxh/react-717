import {createStore,applyMiddleware} from "redux"
import reducers from "./reducers.js"
import logger from "redux-logger"//中间价  记录器
let store=createStore(reducers,applyMiddleware(logger))
export default store