import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    
    const accessToken = localStorage.getItem('access_token');
    const navigate = useNavigate()

    return (
    <>
    {localStorage.getItem('access_token') ? children : <Navigate to='/login' replace={true}/>}
    </>    
    )


}