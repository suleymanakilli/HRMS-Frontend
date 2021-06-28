import axios from 'axios'

export default class AuthService{
    login(values){
        return axios.post(`auth/login`,values)
    }
}