import React, {useRef, useState} from "react";
import {Button} from "react-bootstrap";
import "./index.css";
import {useDispatch} from "react-redux";
import {removeTodo, editTodo, toggleTodo, POPUP} from "../../redux/actions/todoitems";
import {deleteReq, editReq, checkboxReq} from "../../utils/requests";
const Todos = ({item}) => {
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);
	const inputRef = useRef(null);

	const onRemove =  (id) => {
		dispatch(removeTodo(id));
		deleteReq(id, dispatch)
	};

	const onEdit = (id, done) => {
		if (inputRef?.current?.value.trim().length > 0) {
			setEditMode(!editMode);
			dispatch(editTodo(id, inputRef?.current?.value, done));
			editReq(id, inputRef?.current.value, dispatch, done)
		} else {
			dispatch({type: POPUP, payload: {msg: "input has no value", visible: true}})
		}
	};

	const checkboxHandler = (id, done) => {
		dispatch(toggleTodo(id));
		checkboxReq(id, done, dispatch)
	};

	return (
		<div className="bg-success bg-opacity-10 rounded-3 p-lg-2 d-flex mt-3 align-items-center ">
			{editMode ? (<div>
				<input
					ref={inputRef}
					defaultValue={item.task}
				/>
				<Button
					onClick={() => setEditMode(false)}
					className="m-lg-2"
					size="sm"
					variant="danger"
				>
					cancel
				</Button>
				<Button
					onClick={() => onEdit(item._id, item.done)}
					className=""
					size="sm"
					variant="info"
				>
					save
				</Button>
			</div>) : (<div className="w-100">
          <span className={`todoTag ${item.done ? "splitText" : ""}`}>
            {item.task}
          </span>
				<input checked={!!item.done} onChange={() => checkboxHandler(item._id, !item.done)} type="checkbox"/>
				<Button
					onClick={() => onRemove(item._id)}
					className="m-lg-2"
					size="sm"
					variant="danger"
				>
					remove
				</Button>
				<Button
					onClick={() => setEditMode(true)}
					className=""
					size="sm"
					variant="info"
				>
					edit
				</Button>
			</div>)}
		</div>);
};

export default Todos;