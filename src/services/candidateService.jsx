import axios from 'axios'
export default class CandidateService{
    getAll(){
        return axios.get("candidates/getall")
    }
    getById(candidateId){
        return axios.get(`candidates/getbyid?id=${candidateId}`)
    }
    add(values){
        return axios.post("candidates/add",values)
    }
    update(values){
        return axios.post("candidates/update",values)
    }
}