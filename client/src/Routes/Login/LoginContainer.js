import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginPresenter from "./LoginPresenter";

const LoginContainer = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const Selector = useSelector(state => state, []);
  console.log(Selector);
  const { email, password } = formData;
  const handleSubmit = async e => {
    e.preventDefault();
    console.log("로그인 성공");
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <LoginPresenter
      {...formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;
