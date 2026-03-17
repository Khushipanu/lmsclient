import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { server } from "../main";
import toast, {Toaster} from 'react-hot-toast'

const UserContext=createContext();

export const UserContextProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [isAuth,setIsAuth]=useState(false)
    const [btnLoading,setBtnLoading]=useState(false);
    const [loading,setLoading]=useState(true);

    async function registerUser(name, email, password, role, navigate) {
        setBtnLoading(true);
        // Clear only necessary items to avoid losing other important data
        localStorage.removeItem("activationToken");
        localStorage.removeItem("token");
        
        // Reset user state
        setUser(null);
        setIsAuth(false);
        
        try {
            const { data } = await axios.post(`${server}/api/user/register`, {
                name,
                email,
                password,
                role
            });
            
            if (data.activationToken) {
                localStorage.setItem("activationToken", data.activationToken);
                toast.success(data.message || "Registration successful! Please check your email for OTP.");
                navigate("/verify");
            } else {
                throw new Error("No activation token received from server");
            }
        } catch (err) {
            console.error("Registration error:", err);
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setBtnLoading(false);
        }
    }

        async function loginUser(email,password,navigate,fetchMyCourse){
        setBtnLoading(true)
        try{
            const {data}=await axios.post(`${server}/api/user/login`,{email,password})
            toast.success(data.message)
            localStorage.setItem("token",data.token);
            setUser(data.user)
            setIsAuth(true)
            setBtnLoading(false)
            navigate("/")
            fetchMyCourse();
        }catch(err){
            setBtnLoading(false)
            setIsAuth(false);
            toast.error(err.response?.data?.message)
        }
    }
    async function verifyOtp(otp, navigate) {
        const activationToken = localStorage.getItem("activationToken");
        if (!activationToken) {
            toast.error("Activation token missing. Please register again.");
            return;
        }
        
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/user/verify`, {
                otp: Number(otp),
                activationToken
            });
            
            toast.success(data.message || "Account verified successfully!");
            
            // Clear the activation token
            localStorage.removeItem("activationToken");
            
            // Reset any existing user state
            setUser(null);
            setIsAuth(false);
            
            // Navigate to login after a short delay
            setTimeout(() => {
                navigate("/login");
            }, 1000);
            
        } catch (err) {
            console.error("Verification error:", err);
            const errorMessage = err.response?.data?.message || "Verification failed. Please try again.";
            toast.error(errorMessage);
            
            // If token is invalid or expired, clear it
            if (err.response?.status === 400 || err.response?.status === 401) {
                localStorage.removeItem("activationToken");
            }
        } finally {
            setBtnLoading(false);
        }
    }


    async function fetchUser(){
        const token = localStorage.getItem("token");
        if(!token){
            setIsAuth(false)
            setUser(null)
            setLoading(false)
            return;
        }
        try{
            const {data}=await axios.get(`${server}/api/user/myprofile`,{
                headers:{
                    token,
                }
            })
            setIsAuth(true)
            setUser(data.user)
            setLoading(false)

        } catch(err){
            // Quietly handle unauthorized/forbidden
            if(err?.response?.status===401 || err?.response?.status===403){
                setIsAuth(false)
                setUser(null)
            } else {
                console.log(err)
            }
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            fetchUser()
        } else {
            setLoading(false)
        }
    },[])
    
    return( <UserContext.Provider
     value={{user,
     setUser,
     setIsAuth,
     isAuth,
     loginUser,
     btnLoading,
     loading,
     registerUser,
     verifyOtp,
     fetchUser

     }}>{children}
    <Toaster/>
    </UserContext.Provider>)
}


export const UserData=()=>useContext(UserContext);