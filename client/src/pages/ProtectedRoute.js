import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { Loading } from "../components"; 

const ProtectedRoute = ({ children })=>{
    const {user, userLoading} = useAppContext();
    
    if(userLoading) return <Loading />;

    if(user){
        return children;
    }
    return <Navigate to="/landing" />
}

export default ProtectedRoute;