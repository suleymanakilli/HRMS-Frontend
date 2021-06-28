import axios from 'axios'
export default class FavoriteJobAdvertisementService{
    addToFavorites(values){
        return axios.post(`favoritejobadvertisements/add`,values)
    }
    removeFromFavorites(values){
        return axios.post(`favoritejobadvertisements/remove`,values)
    }
    getAll(){
        return axios.get("favoritejobadvertisements/getall")
    }
    getById(candidateId){
        return axios.get(`favoritejobadvertisements/getbycandidateid?candidateId=${candidateId}`)
    }
}