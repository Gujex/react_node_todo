import axios from "axios";

export const FETCH_DATA = "FETCH_DATA"
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const PAGINATED_TODO = "PAGINATED_TODO";
export const PAGINETED_TO_NEXT_PAGE = "PAGINETED_TO_NEXT_PAGE";


export const addTask = (todo, nextPage) => {
	return {
		type: ADD_TODO, payload: {inputValue: todo, nextPage: nextPage}
	};
};

export const removeTodo = (id) => {
	return {
		type: REMOVE_TODO, payload: id
	};
};

export const editTodo = (id, editInputValue) => {
	return {
		type: EDIT_TODO, payload: {id: id, inputValue: editInputValue}
	};
};

export const toggleTodo = (id) => {
	return {
		type: TOGGLE_TODO, payload: id
	};
};
export const paginatedTodo = (index) => {
	return {
		type: PAGINATED_TODO, payload: index
	};
};

export const showNextPage = (buttons) => {
	return {
		type: PAGINETED_TO_NEXT_PAGE, payload: buttons
	};
};