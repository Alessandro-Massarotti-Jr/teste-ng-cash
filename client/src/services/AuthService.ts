import api from "./api";
import { UserDataInterface } from "./UserService";
import { toast } from 'react-toastify'

export class AuthService {

    public static async login(userData: UserDataInterface) {

       await api.post('/auth/login', {
            username: userData.username,
            password: userData.password
        }).then(response => {

            localStorage.setItem('access_token',response.data.data.token);

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }).catch(error => {

            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        
        });

    }

    public static async logout() {
        await api.get('/auth/logout').then(response => {

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }).catch(error => {

            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
     
        });

    }

}
