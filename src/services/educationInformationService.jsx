import axios from 'axios'
export default class EducationInformationService{
    add(values){
        return axios.post("educationinformations/add",values)
    }
}