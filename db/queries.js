import axios from "axios";

const root = "https://invo-be.onrender.com/api"
const query = (endpoint) => {
    axios.get(root +endpoint)
    .then((res) => { console.log(res) })
};

query("/users");