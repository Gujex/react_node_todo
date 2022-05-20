import {
	FETCH_DATA, ADD_TODO, REMOVE_TODO, TOGGLE_TODO, EDIT_TODO, PAGINATED_TODO, PAGINETED_TO_NEXT_PAGE
} from "../actions/todoitems";

const initialState = {
	todos: [], pagination: [], activePage: 1, todosPerPage: 5
};


const todoitems = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_DATA : {
			return {...state, todos: action.payload,};
		}
		case ADD_TODO :
			return {
				...state,
				todos: [...state.todos, {task: action.payload.task, _id: action.payload.id, done: action.payload.done}],
				activePage: action.payload.nextPage
			};
		case REMOVE_TODO :
			const filteredState = state.todos.filter(item => item._id !== action.payload);
			if ((state.todos.length - 1) % state.todosPerPage === 0 && (state.todos.length - 1) / state.todosPerPage === state.activePage - 1) {
				return {
					...state, todos: filteredState, activePage: state.activePage - 1
				};
			} else {
				return {
					...state, todos: filteredState,
				};
			}

		case EDIT_TODO :
			const changedValue = state.todos.map(item => item._id === action.payload.id ? item.todos = {
				task: action.payload.inputValue, _id: action.payload.id, done: action.payload.done
			} : item);
			return {
				...state, todos: changedValue
			};

		case TOGGLE_TODO :
			const toggleTodo = state.todos.map(todo => todo._id === action.payload ? {...todo, done: !todo.done} : todo);
			return {
				...state, todos: toggleTodo
			};

		case PAGINATED_TODO :
			return {
				...state, activePage: action.payload
			};
		case PAGINETED_TO_NEXT_PAGE :
			return {
				...state, pagination: [...action.payload],
			};

		default:
			return state;
	}
};

export default todoitems;