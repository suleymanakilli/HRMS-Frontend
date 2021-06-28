import axios from 'axios'

export default class CandidateCoverLetterService{
    getByCandidateId(candidateId){
        return axios.get(`candidatecoverletters/getbycandidateid?candidateId=${candidateId}`)
    }
    addCoverLetter(values){
        axios.post('candidatecoverletters/add',values)
    }
}