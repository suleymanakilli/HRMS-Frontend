import axios from "axios"

export default class TypeOfWorkService{
    getAll(){
        return axios.get("typeofworks/getall")
    }
}