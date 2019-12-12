import React, { useState, useEffect } from "react";
import RegisterPresenter from "./registerPresenter";
import axios from "axios";

const RegisterContainer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = formData;
  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("비밀번호가 다릅니다.");
    } else {
      const newUser = {
        name,
        email,
        password
      };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post("api/users/register", body, config);
        console.log(res.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <RegisterPresenter
      {...formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterContainer;
