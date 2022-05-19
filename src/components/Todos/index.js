import React, {useRef, useState} from "react";
import {Button} from "react-bootstrap";
import "./index.css";
import {useDispatch} from "react-redux";
import {removeTodo, editTodo, toggleTodo, FETCH_DATA} from "../../redux/actions/todoitems";
import axios from "axios";

const Todos = ({
	               item
               }) => {
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);
	const inputRef = useRef(null);


	const onRemove =  (id) => {
		dispatch(removeTodo(id));
		 axios.delete(`http://localhost:2000/api/todos/${id}`)
			.then(res => {
				console.log('data removed succesfully', res)
				// dispatch({type: FETCH_DATA, payload: res.data});
			}).catch(err => {
			console.log('error', err)
		});


		// axios.get(`http://localhost:2000/api/todos`)
		// 	.then(res => {
		// 		// await console.log(res.data)
		// 		console.log('------',res.data)
		// 		console.log('------')
		// 		dispatch({type: FETCH_DATA, payload: res.data});
		// 	}).catch(err => {
		// 	console.log(err);
		// });
	};

	const onEdit = (id) => {
		if (inputRef?.current?.value.trim().length > 0) {
			setEditMode(!editMode);
			dispatch(editTodo(id, inputRef?.current?.value));
			axios.patch(`http://localhost:2000/api/todos/${id}`, {task: inputRef?.current.value, done: false})
				.then(res => {
					console.log('data removed succesfully', res)
					// dispatch({type: FETCH_DATA, payload: res.data});
				}).catch(err => {
				console.log('error', err)
			});
		}
	};

	const checkboxHandler = (id, done) => {
		dispatch(toggleTodo(id));

			axios.patch(`http://localhost:2000/api/todos/${id}`, {done: done})
				.then(res => {
					console.log('data removed succesfully', res)
					// dispatch({type: FETCH_DATA, payload: res.data});
				}).catch(err => {
				console.log('error', err)
			});


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
					onClick={() => onEdit(item._id)}
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
