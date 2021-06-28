import axios from 'axios'
export default class SchoolService{
    getAll(){
        return axios.get("schools/getall")
    }
}