import React, { useEffect } from 'react'
import './Dashboard.css'
import { CourseData } from '../context/courseContext'
import CourseCard from '../components/coursescard/CourseCard'
const Dashboard = () => {
    const {mycourse, fetchMyCourse}=CourseData()

    useEffect(()=>{
        fetchMyCourse()
    },[])
    
  return (
    <div className="student-dashboard" >
        <h2>All enrolled courses</h2>
        <div className="dashboard-content">
            {
                mycourse &&  mycourse.length>0?  
                mycourse.map((e)=>(
                    <CourseCard key={e._id} course={e}/> 
                
                ) )
                :<p> No courses Enrolled yet</p>
            }
        </div>
      
    </div>
  )
}

export default Dashboard
