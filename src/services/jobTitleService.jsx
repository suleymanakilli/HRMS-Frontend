import axios from "axios"

export default class JobTitleService{
     getAll(){
         return axios.get("jobtitles/getall")
     }
    
}