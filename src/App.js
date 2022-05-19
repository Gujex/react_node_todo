import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./components/Pagination/index";
import AddTask from "./components/AddTask/index";
import Todos from "./components/Todos/index";
import {useSelector} from "react-redux";
import {slicerSelector} from "./redux/selectors/selectors";
import {useEffect, useState} from "react";
import axios from "axios";
import {FETCH_DATA} from "./redux/actions/todoitems";
import {useDispatch} from "react-redux";
import {todosSelector} from "./redux/selectors/selectors";


const App = () => {
	const {todos} = useSelector(todosSelector)
	const todoState = useSelector(state => state);
	const dispatch = useDispatch();
	const [item, setItem] = useState(null)
console.log('item', item)
	const fetchingData = async () => {

		axios.get(`http://localhost:2000/api/todos`)
			.then(res => {
				// await console.log(res.data)
				console.log('------',res.data)
				console.log('------')
				dispatch({type: FETCH_DATA, payload: res.data});
			}).catch(err => {
			console.log(err);
		});
	};

	console.log(todoState)

	useEffect(() => {
		fetchingData();
	}, []);


	const slicedTodo = useSelector(slicerSelector);

	return (<>
		<div className="Container">
			<AddTask/>
			{slicedTodo?.map((item) => {
				return (<Todos
					key={item._id}
					item={item}
				/>);
			})}
			<Pagination
			/>
		</div>
	</>);
};
export default App;


//
// export const todos = createSelector(selectTodos, ({todos, pagination, activePage, todosPerPage}) => {
// 	let end = activePage * todosPerPage;
// 	let start = end - todosPerPage;
// 	const  todosMapped =  todos.slice(start, end);
//
// 	return {todosMapped}
// })