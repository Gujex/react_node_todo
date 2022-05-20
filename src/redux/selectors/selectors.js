import {createSelector} from "reselect";

export const selectTodos = state => state;

export const todosSelector = createSelector(selectTodos, ({todos, pagination, activePage, todosPerPage}) => {
	let paginationButtons = [];
	for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
		paginationButtons.push(i);
	}
	return {todos, pagination, activePage, paginationButtons};
});

export const slicerSelector = createSelector(selectTodos, ({todos, activePage, todosPerPage}) => {
	let end = activePage * todosPerPage;
	let start = end - todosPerPage;
	return todos.slice(start, end);
});

export const nextPagerSelector = createSelector(selectTodos, ({todos,  todosPerPage}) => {
	return Math.ceil((todos.length + 1) / todosPerPage);
});




