import { createContext,useState,useEffect } from "react";
import { logIn,signOff } from "../shared/firebase";

const initialState={
    isLoggedIn:false,    
    token:'',
    uid:'',
    login:(email,password)=>{},
    signOff:()=>{}
}
const ctx=createContext(initialState);
const Provider=ctx.Provider;
export const AppProvider=(props)=>{
    useEffect(()=>{
        const tokenld = localStorage.getItem("user_token");
        if(tokenld){
            setIdToken(tokenld);    
        }
        const uidls = localStorage.getItem("user_id");
        if(uidls){
            setIdUid(uidls);    
        }
        if(tokenld){
            setLoggedIn(true);
        }    
    }
    ,[]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [idToken, setIdToken] = useState('');
    const [uid, setIdUid] = useState('');
    const loginHandler=async(email,password)=>{
        const user= await logIn(email,password);
        setLoggedIn(true);
        setIdToken(user.accessToken);
        setIdUid(user.uid);
    }
    const signOffHandler=async()=>{
        await signOff();
        setLoggedIn(false);
        setIdToken('');
    }
    return <Provider value={{
        isLoggedIn:loggedIn,
        login:loginHandler,
        token:idToken,
        uid:uid,
        signOff:signOffHandler
    }}>{props.children}</Provider>;
}
export default ctx;