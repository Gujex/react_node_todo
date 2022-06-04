import {useDispatch} from "react-redux";
import {POPUP} from "../redux/actions/todoitems";
const Modal = ({state}) => {
    const dispatch = useDispatch()
    return (<>
        <div className={`alert alert-warning alert-dismissible fade ${state.popup.visible ? "show" : ""}`} role="alert">
            <strong>{state.popup.msg}</strong>
            <button onClick={() => {
                dispatch({type: POPUP, payload: {msg: "", visible: false}})
            }} type="button" className="close" data-dismiss="alert"
                    aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </>);
};
export default Modal;