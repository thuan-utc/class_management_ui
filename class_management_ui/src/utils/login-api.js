import axios from "axios"
export {
  login, signup
};

async function login(user) {
  const response = await axios.post(`http://localhost:8090/login`, user);
    return response;
}

async function signup(newUser) {
  const response = await axios.post(`http://localhost:8090/signup`, newUser);
    return response;
}