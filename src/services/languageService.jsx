import axios from 'axios'

export default class LanguageService{
    add(values){
        return axios.post("languages/add",values)
    }
}