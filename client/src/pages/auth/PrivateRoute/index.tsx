import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserService } from "../../../services/UserService";

interface PrivateRouteProps {
    children: React.ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {

    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            const response = await UserService.authUser();
            console.log(response)
      
            if(!response){
                navigate('/login',{replace:true})
            }
            setIsLoading(false);
        }
        checkAuth()
    }, []);

    return (
        <>
            {!isLoading && children}
        </>
    )


}