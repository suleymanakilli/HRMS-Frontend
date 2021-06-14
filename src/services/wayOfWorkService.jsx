import axios from "axios"

export default class WayOfWorkService{
    getAll(){
        return axios.get("http://localhost:8080/api/wayofworks/getall")
    }
}