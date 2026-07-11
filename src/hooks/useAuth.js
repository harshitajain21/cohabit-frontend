import {useCallback,useState} from "react"; import {setAuthToken} from "../services/api";
export function useAuth(){const [token,setToken]=useState(null);const signIn=useCallback(value=>{setAuthToken(value);setToken(value)},[]);const signOut=useCallback(()=>{setAuthToken(null);setToken(null)},[]);return {token,signIn,signOut}}
