import axios from 'axios'

export default class DepartmentService{
    getAll(){
        return axios.get("departments/getall")
    }
}