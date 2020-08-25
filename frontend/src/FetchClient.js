import axios from "axios";
const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_PATH,
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  //let token = localStorage.getItem('token')
  let token = localStorage.getItem("token");
  if (localStorage.getItem("token")) {
    Object.assign(instance.defaults, {
      headers: { authorization: "Token " + token },
    });
  }
  return instance;
};

export default fetchClient();
