import axios from "axios";
//const API = 'http://localhost:8000';
import FetchClient from "../FetchClient";

const APIS = "http://192.168.1.253:8000";

export default class Users {
  loginUser(user) {
    const url = `${APIS}/api/user/login/`;
    return axios.post(url, user);
  }

  registerUser(user) {
    const url = `${APIS}/api/user/register/`;
    return axios.post(url, user);
  }

  getUser() {
    const url = `${APIS}/api/user/get`;
    return FetchClient.get(url).then((response) => response.data);
  }
  updateUser(user) {
    const url = `${APIS}/api/user/get`;
    return FetchClient.put(url,user);
  }
}
