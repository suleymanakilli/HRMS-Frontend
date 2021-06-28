import axios from 'axios'
export default class EmployeeService{
    getAll(){
        return axios.get("employees/getall")
    }
    getById(id){
        return axios.get(`employees/getbyid?id=${id}`)
    }
    update(values){
        return axios.post("employees/update",values)
    }
}