import axios from "axios";
import {ADD_TODO, POPUP} from "../redux/actions/todoitems";
export const postReq = (inputValue, nextPage, dispatch) => {
    axios.post(`http://localhost:2000/api/todos/add`, {task: inputValue, done: false})
        .then(res => {
            dispatch({
                type: ADD_TODO,
                payload: {task: inputValue, id: res.data.todos._id, done: false, nextPage: nextPage}
            })
        }).catch(err => {
        dispatch({type: POPUP, payload: {msg: err, visible: true}})
    });
}

export const deleteReq = (id, dispatch) => {
    axios.delete(`http://localhost:2000/api/todos/${id}`)
        .then().catch(err => {
        dispatch({type: POPUP, payload: {msg: err, visible: true}})
    });
}

export const editReq = (id, inputValue, dispatch, done) => {
    axios.patch(`http://localhost:2000/api/todos/${id}`, {task: inputValue, done: done})
        .then().catch(err => {
        dispatch({type: POPUP, payload: {msg: err, visible: true}})
    });
}

export const checkboxReq = (id, done, dispatch) => {
    axios.patch(`http://localhost:2000/api/todos/${id}`, {done: done})
        .then().catch(err => {
        dispatch({type: POPUP, payload: {msg: err, visible: true}})
    })}