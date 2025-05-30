import type { ReactNode } from "react"
import { Navigate } from "react-router-dom";

interface PrivateRouterProps{
  children:ReactNode
}
export default function PrivateRouter({children}:PrivateRouterProps){
   const token=localStorage.getItem('token');
   if(token==='7'){
    console.log("login");
    
    return(
        children 
     )
   }
   return <Navigate to="/login"/>
   
}