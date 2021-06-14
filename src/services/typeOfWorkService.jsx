import axios from "axios"

export default class TypeOfWorkService{
    getAll(){
        return axios.get("http://localhost:8080/api/typeofworks/getall")
    }
}