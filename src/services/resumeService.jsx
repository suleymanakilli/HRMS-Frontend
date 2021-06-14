import axios from 'axios'
export default class ResumeService{
    getShortResumes(){
        return axios.get("http://localhost:8080/api/candidateresumes/getshortresumes")
    }
    getResumeByUserId(){
        
    }
}