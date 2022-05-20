import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./components/Pagination/index";
import AddTask from "./components/AddTask/index";
import Todos from "./components/Todos/index";
import {useSelector} from "react-redux";
import {slicerSelector} from "./redux/selectors/selectors";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {fetchData} from "./redux/actions/todoitems";

const App = () => {

	const slicedTodo = useSelector(slicerSelector);
	const dispatch = useDispatch();
	const fetchingData = async () => {

		axios.get(`http://localhost:2000/api/todos`)
			.then(res => {
				dispatch(fetchData(res.data));
			}).catch(err => {
			console.log(err);
		});
	};

	useEffect(() => {
		fetchingData().then(r => console.log(r));
	}, []);


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


