import { Navigate } from "react-router-dom";
import { userService } from "../service/user";

const SecuredRoute = ({children}) => {
    const user = userService.get();
    return (user == null || user.role !== 'ADMIN') ? <Navigate to='/home' /> : children;
}

export default SecuredRoute;