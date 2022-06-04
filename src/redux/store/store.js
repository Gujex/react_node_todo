import {createStore} from "redux";
import todoitems from "../reducers/todoitems.js"
export const store = createStore(todoitems)