import {Button} from "react-bootstrap";
import React, {useState} from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {ADD_TODO, addTask, FETCH_DATA} from "../../redux/actions/todoitems";
import {nextPagerSelector} from "../../redux/selectors/selectors";
import axios from "axios";
// import {Todo} from "../../utils/requests";
// import {addTodo} from "../../server";

const SearchForm = () => {
	const nextPage = useSelector(nextPagerSelector);
	const [inputValue, setInputValue] = useState("");
	const dispatch = useDispatch();
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			submitHandler();
		}
	};

	const submitHandler = () => {
		if (inputValue.trim().length === 0) {
			alert("input have no value");
		} else {
			// dispatch(addTask(inputValue, nextPage));
			// addTodo()
			setInputValue('');
			axios.post(`http://localhost:2000/api/todos/add`, {task: inputValue, done: false})
				.then(res => {
					console.log(res.data.todos._id)
					console.log('data posted succesfully')
					dispatch({type: ADD_TODO, payload: {task: inputValue, id: res.data.todos._id, done: false, nextPage: nextPage}})
				}).catch(err => {
				console.log(err);
				console.log('error')
			});
		}
	};

	return (<div className="d-flex w-100 justify-content-sm-center mt-3">
		<input
			onKeyUp={handleKeyDown}
			value={inputValue}
			className="SearchInput"
			onChange={(e) => setInputValue(e.target.value)}
		/>
		<Button size="sm" onClick={submitHandler} variant="primary">
			Add
		</Button>
	</div>);
};

export default SearchForm;



