import axios from 'axios'
export default class EmployerService{
    getNotApprovedOnes(){
        return axios.get("employers/getnotapprovedones")
    }
    getById(id){
        return axios.get(`employers/getbyid?id=${id}`)
    }
    update(values){
        return axios.post("employers/update",values)
    }
    getToBeUpdatedOnes(){
        return axios.get("employers/gettobeupdatedones")
    }
    
}