import axios from 'axios';
import jwtDecode from 'jwt-decode';

const httpClient = axios.create();

httpClient.getToken = () => {
    return localStorage.getItem('token')
}

httpClient.setToken = (token) => {
    localStorage.setItem('token', token)
    return token
}

httpClient.getCurrentUser = function() {
    const token = this.getToken()
    if(token) return jwtDecode(token)
    else return null
}

httpClient.signUp = function(userInfo){
    return this({ method: 'post', url: '/api/users', data: userInfo })
        .then((serverResponse) => {
            if(serverResponse.data.message === "SUCCESS") {
                const token = serverResponse.data.payload
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            }
            else {
                return false 
            }
        })
}

httpClient.editUser = function(userInfo){
    return this({ method: 'patch', url: '/api/users/me', data: userInfo })
        .then((serverResponse) => {
            console.log(serverResponse.data)
            if(serverResponse.data.message === "SUCCESS") {
                const token = serverResponse.data.payload
                this.defaults.headers.common.token = this.setToken(token)
                let decoded = jwtDecode(token);
                debugger
                return decoded
            }
            else {
                return false 
            }
        })
}

httpClient.delete = function(userInfo){
    return this({ method: 'delete', url: '/api/users/me', data: userInfo })
    .then((serverResponse) => {
        if(serverResponse.data.message === "SUCCESS"){
            localStorage.clear
        }
    })
}

httpClient.logIn = function(credentials){
    return this({ method: 'post', url: '/api/users/authenticate', data: credentials })
        .then((serverResponse) => {
            console.log(serverResponse.data)
            if(serverResponse.data.message === "SUCCESS") {
                const token = serverResponse.data.payload
                console.log(token)
                this.defaults.headers.common.token = this.setToken(token)
                return jwtDecode(token)
            }
            else {
                return false 
            }
        })
}

httpClient.logOut = function(){
    localStorage.clear()
    delete httpClient.defaults.headers.common.token
    return true
}

httpClient.defaults.headers.common.token = httpClient.getToken()
export default httpClient;