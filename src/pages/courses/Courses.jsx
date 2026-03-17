import React from 'react'
import "./courses.css"
import { CourseData } from '../../context/courseContext'
import CourseCard from '../../components/coursescard/CourseCard';

const Courses = () => {
    const {courses}=CourseData();
    
  return (
    <div className="courses" >
        <h2>Available Courses</h2>
        <div className="course-container">
            {
                courses&& courses.length>0 ?  courses.map((e)=>(
                    <CourseCard key={e._id} course={e} />
                )):
                 <p>No couses yet</p>
            }

        </div>
       
      
    </div>
  )
}

export default Courses;
