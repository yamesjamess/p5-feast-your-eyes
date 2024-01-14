import axios from "axios";

axios.defaults.baseURL = "https://fye-drf-api-6b84783d9a37.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
