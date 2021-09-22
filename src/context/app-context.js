import { createContext,useState,useEffect } from "react";
import { logIn,signOff,signUp } from "../shared/firebase";
import { useHistory } from 'react-router-dom';

const initialState={
    isLoggedIn:false,    
    token:'',
    uid:'',
    error:{code:'',message:''},
    login:(email,password)=>{},
    signup:(email,password)=>{},
    signOff:()=>{},
    clearError:()=>{}
}
const ctx=createContext(initialState);
const Provider=ctx.Provider;
export const AppProvider=(props)=>{
    const history=useHistory();
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
    const [error, setError] = useState();
    const loginHandler=async(email,password)=>{
        const result= await logIn(email,password);
        if(!result.code)
        {
            history.replace("/");
            setLoggedIn(true);
            setIdToken(result.accessToken);
            setIdUid(result.uid);
        }else{
            setError(result);
        }
    }
    const signUpHandler=async(email,password)=>{
        const result= await signUp(email,password);        
        if(!result.code)
        {
            history.replace("/");
            setLoggedIn(true);
            setIdToken(result.accessToken);
            setIdUid(result.uid);
        }else{
            setError(result);
        }
    }
    const signOffHandler=async()=>{
        await signOff();
        setLoggedIn(false);
        setIdToken('');
    }
    return <Provider value={{
        isLoggedIn:loggedIn,
        login:loginHandler,
        signUp:signUpHandler,
        token:idToken,
        uid:uid,
        error,
        signOff:signOffHandler,
        clearError:()=>{setError(null)}
    }}>{props.children}</Provider>;
}
export default ctx;