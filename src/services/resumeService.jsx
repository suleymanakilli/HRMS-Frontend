import axios from 'axios'
export default class ResumeService{
    getShortResumes(){
        return axios.get("candidateresumes/getshortresumes")
    }
    getShortResumesByCandidateId(candidateId){
        return axios.get(`candidateresumes/getshortresumesbycandidateid/?candidateId=${candidateId}`)
    }
    getResumeDetailsByResumeId(resumeId){
        return axios.get(`candidateresumes/getresumedetailsbyresumeid/?resumeId=${resumeId}`)
    }
    add(values){
        return axios.post("candidateresumes/add",values)
    }
}