import axios from "axios"

export default class JobAdvertisementService{
     getAll(){
         return axios.get("http://localhost:8080/api/jobadvertisements/getall")
     }
     getJobAdvertisementDetails(id){
        return axios.get(`http://localhost:8080/api/jobadvertisements/getbyid?id=${id}`)
     }
     postJobAdvertisement(values){
         return axios.post("http://localhost:8080/api/jobadvertisements/add",values)
     }
}