import axios from "axios";
import { createContext ,useContext, useEffect, useState} from "react";
import { server } from "../main";

const CourseContext=createContext();

export const CourseContextProvider=({children})=>{
    const [courses,setCourses]=useState([])
    const [course,setCourse]=useState([])
    const [mycourse,setMyCourse]=useState([])


    async function fetchCourses(){
        try{
            const {data}=await axios.get(`${server}/api/courses/all`)
            setCourses(data.courses)

        }catch(err){
            console.log(err)
        }
    }

    async function fetchCourse(id){
        try{
            const {data} =await axios.get(`${server}/api/course/${id}`)
            setCourse(data.course)


        }catch(err){
            console.log(err)
        }

    }
    async function fetchCourseByAdmin(id){
        try{
            const {data}=await axios.get(`${server}/api/admin/course/${id}`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setCourse(data.course)
        }catch(err){
            console.log(err)
        }
    }

    async function fetchMyCourse(){
        try{
            const {data}=await axios.get(`${server}/api/mycourse`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setMyCourse(data.courses)  //since courses is wht we ve sent in baceknd
            // debug log
            fetch('http://127.0.0.1:7244/ingest/cba76890-d6d2-4468-a4b2-7d18789dcd5e',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    location:'courseContext.jsx:fetchMyCourse',
                    message:'fetched my courses',
                    data:{ count:data.courses?.length ?? 0 },
                    timestamp:Date.now(),
                    hypothesisId:'H1'
                })
            }).catch(()=>{})

        }catch(err){
            // Ignore 401/403 when user is not logged in
            if(!(err?.response?.status===401 || err?.response?.status===403)){
                console.log(err)
            }
        }
        

    }
    useEffect(()=>{
        fetchCourses()
        if(localStorage.getItem("token")){
            fetchMyCourse()
        }
    },[])
    return <CourseContext.Provider
    value={{courses,fetchCourses,fetchCourse,course,fetchMyCourse,mycourse,fetchCourseByAdmin}}>
    
        {children}
    </CourseContext.Provider>
}
export const CourseData=()=>useContext(CourseContext);