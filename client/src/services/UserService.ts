import api from "./api";
import { toast } from 'react-toastify'

export interface UserDataInterface {
    username: string;
    password: string;
}

export interface AuthUserInterface{
    id?:string;
    username?: string;
    password?: string;
}

export class UserService {

    public static async authUser() {

        let authUser: AuthUserInterface | null = {};

        await api.get('/users/auth-user').then(response => {
            authUser = response.data.data;
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

            authUser = null;

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
        return authUser;

    }
    public static async store(userData: UserDataInterface) {
      await  api.post('/users', userData).then(response => {

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

