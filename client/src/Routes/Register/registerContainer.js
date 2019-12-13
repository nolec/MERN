import React, { useState, useEffect } from "react";
import RegisterPresenter from "./RegisterPresenter";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const RegisterContainer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated, []);
  const dispatch = useDispatch();
  const { name, email, password, password2 } = formData;
  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("패스워드가 틀렸습니다.", "danger"));
    } else {
      dispatch(register({ name, email, password }));
    }
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <RegisterPresenter
      isAuthenticated={isAuthenticated}
      {...formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterContainer;
