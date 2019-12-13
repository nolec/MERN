import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginPresenter from "./LoginPresenter";
import { login } from "../../actions/auth";

const LoginContainer = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated, []);

  const dispatch = useDispatch();
  const { email, password } = formData;
  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(login(email, password));
    props.history.push("/");
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <LoginPresenter
      isAuthenticated={isAuthenticated}
      {...formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;
