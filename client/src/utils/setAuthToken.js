import axios from "axios";

const setAuthToken = token => {
  if (token) {
    console.log("setAuthToken 입니다.");
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
