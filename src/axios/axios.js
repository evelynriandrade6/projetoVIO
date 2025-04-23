import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000/api/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    getUsers:()=>api.get("user"),
    postLogin:(user) => api.post("user/login", user),
    deleteUsers:(id) => api.delete("user/"+id),
    getEvento:() => api.get ("evento"),
    deleteEvento:(id) => api.delete("evento"+id)
}

export default sheets;