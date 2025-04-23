import DefaltLayout from "./DefaltLayout";
 import { Navigate } from "react-router-dom";
 
 const ProtectedRoute = ({children}) =>{
     const isAuthenticated = localStorage.getItem("authenticated");
     return isAuthenticated ? <DefaltLayout>{children}</DefaltLayout> : <Navigate to="/"/>
 }
 export default ProtectedRoute