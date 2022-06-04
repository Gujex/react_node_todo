import {Button} from "react-bootstrap";
import React, {useState} from "react";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {nextPagerSelector} from "../../redux/selectors/selectors";
import {postReq} from "../../utils/requests";
import {POPUP} from "../../redux/actions/todoitems";

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
            dispatch({type: POPUP, payload: {msg: "input has no value", visible: true}})
        } else {
            setInputValue('');
            postReq(inputValue, nextPage, dispatch)
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