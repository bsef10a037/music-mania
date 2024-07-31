import React,{ useRef, useReducer, useEffect, useContext } from 'react';
import Input from '../UI/Input';
import { NavLink, useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal";

let isInitial = true;
const authReducer = (state, action) => {  
  let errors = [];
  if (action.type == 'SERVER_ERROR') {
    errors.push(action.errorMessage);
    return {
      email: state.email,
      password: state.password,
      error: action.error,
      errorMessage: errors
    }
  }
  if (action.type == 'SUBMIT') {
    if (action.name.trim() === "") {
      errors.push("Name cannot be empty");
    }
    if (action.email.trim() === "") {
      errors.push("Email cannot be empty");
    }
    if (action.password.trim() === "") {
      errors.push("Password cannot be empty");
    }
    if (action.password.trim().length < 6) {
      errors.push("Password length cannot be less than 6 chracters");
    }
    if (!action.terms_and_condition) {
      errors.push("Please accept our terms and conditions");
    }
    if(errors.length > 0) {
      return {
        name: action.name,
        email: action.email,
        password: action.password,
        error: true,
        errorMessage: errors
      }
    }
    else {
      return {
        name: action.name,
        email: action.email,
        password: action.password,
        error: false,
        errorMessage: errors
      }
    }
  }
  else {
    return {
      name: "",
      email: "",
      password: "",
      error: false,
      errorMessage:[]
    }
  }
}

function SignUp(props)  {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const ctxAuth = useContext(AuthContext);
  
  const initialAuthState = {name: "", email: "", password:"", terms_and_condition:false, error: false, errorMessage: [""]};
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  const {fetchDataHandler: sendData, loading: authLoading} = useData();
  const navigate = useNavigate();
  const navigateHandler = (e) => {
    navigate(e);
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch({type:"SUBMIT", name: nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value, terms_and_condition: e.target.terms_and_condition.checked });
  }

  const getAuthData = async(data) => {
    // if (data.error) {
    //   dispatch({type: "SERVER_ERROR", error: true, errorMessage:data.error.message})
    // }
    // else{
      await ctxAuth.signup({"name": "syed walayat ali", "email": "walayat37@gmail.com"});
      navigateHandler('/');
    // }
  }
  
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if(!isInitial) {
      console.log(authState);
      console.log("Add Data up API Here")
      if (!authState.error) {
        sendData("https://546e799e-fed6-4bf3-8232-c0d30e244571.mock.pstmn.io/user", {
        method: 'POST',
        body: JSON.stringify({"name":nameRef.current.value, "email":emailRef.current.value, "password":passwordRef.current.value}),
        headers: {
          'Content-Type': 'application/json',
          'x-mock-match-request-body': false
        }
      },
      getAuthData);
        // navigateHandler('/main');
      }
    }
  }, [authState])
  
  return (
    <section id="content" className="bg-info dker wrapper-md animated fadeInDown" style={{"height":"150vh"}}>
      {authLoading && <Modal>Please Wait ...</Modal>}
      <div className="container aside-xl">
        <NavLink className="navbar-brand block" to="/signup">
          <span className="h1 font-bold">
            Musik
          </span>
        </NavLink>
        <section className="m-b-lg">
          <header className="wrapper text-center">
            <strong>
              Sign up to find interesting thing
            </strong>
          </header>
          <form onSubmit={submitHandler}>
          {authState.error && 
            <ul className="text-danger list-group">
              {authState.errorMessage.map((eachMessage, index) => (
                <li className="list-group-item list-group-item-danger" key={index}>{eachMessage}</li>
                ))}
            </ul>
          }
          <Input ref={nameRef} input={{"type":"text", "placeholder":"Name",
            "className":"form-control rounded input-lg text-center no-border"}}/>
          <Input ref={emailRef} input={{"type":"email", "placeholder":"Email",
            "className":"form-control rounded input-lg text-center no-border"}}/>
          <Input ref={passwordRef} input={{"type":"password", "placeholder":"Password", "className":"form-control rounded input-lg text-center no-border"}}/>
            <div className="checkbox i-checks m-b">
              <label className="m-l">
                <input type="checkbox" name="terms_and_condition" id="terms_and_condition" value="" />
                <i></i>
                 Agree the <NavLink to="#">terms and policy</NavLink>
              </label>
            </div>
            <button type="submit" className="btn btn-lg btn-warning lt b-white b-2x
              btn-block btn-rounded">
              <i className="icon-arrow-right pull-right"></i>
              <span className="m-r-n-lg">Sign up</span>
            </button>
            <div className="line line-dashed"></div>
            <p className="text-muted text-center">
              <small>Already have an account?</small>
            </p>
            <NavLink className="btn btn-lg btn-info btn-block rounded" to="/signin" >
              Sign in
            </NavLink>
          </form>
        </section>
      </div>
    </section>
  )
}

export default SignUp;