import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./components/Pagination/index";
import AddTask from "./components/AddTask/index";
import Todos from "./components/Todos/index";
import {useSelector, useDispatch} from "react-redux";
import {slicerSelector} from "./redux/selectors/selectors";
import {useEffect} from "react";
import axios from "axios";
import {FETCH_DATA, POPUP} from "./redux/actions/todoitems";
import Modal from "./utils/Modal";

const App = () => {
    const todoState = useSelector(state => state);
    const slicedTodo = useSelector(slicerSelector);
    const dispatch = useDispatch();
    const fetchingData = () => {
        axios.get(`http://localhost:2000/api/todos`)
            .then(res => {
                dispatch({type: FETCH_DATA, payload: res.data});
            }).catch(err => {
            dispatch({type: POPUP, payload: {msg: err, visible: true}})
        });
    };
    useEffect(() => {
        fetchingData();
    }, []);

    return (<>
        <div className="Container">
            <Modal state={todoState}/>
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