import axios from 'axios';

const instance = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com",
	
});
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN From Instance";

export default instance;