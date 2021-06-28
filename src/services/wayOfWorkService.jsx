import axios from "axios"

export default class WayOfWorkService{
    getAll(){
        return axios.get("wayofworks/getall")
    }
}