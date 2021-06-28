import axios from 'axios'
export default class WorkExperienceService{
    add(values){
        return axios.post("workexperiencescontroller/add",values)
    }
}