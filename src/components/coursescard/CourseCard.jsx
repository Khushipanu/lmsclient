
import React from 'react'
import "./CourseCard.css"
import { server } from '../../main'
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CourseData } from '../../context/courseContext'
import toast from 'react-hot-toast'

const CourseCard = ({ course }) => {
  const navigate = useNavigate()
  const { user, isAuth } = UserData()
  const { fetchCourses } = CourseData()

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        toast.success(data.message)
        fetchCourses()
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong")
      }
    }
  }

  // ✅ Check if admin created this course (works with name or ID)
  const isCreatedByAdmin =
    user &&
    user.role === "admin" &&
    (course.createdBy === user.name || course.createdBy === user._id)

  return (
    <div>
      <div className="course-card">
        <img src={`${server}/${course.image}`} alt="" className="course-image" />
        <h3>{course.title}</h3>
        <p>Instructor - {course.createdBy}</p>
        <p>Duration - {course.duration} weeks</p>
        <p>Price - ₹{course.price}</p>

        {/* ------------------- MAIN BUTTON LOGIC ------------------- */}
        {!isAuth ? (
          // ❌ Not logged in
          <button onClick={() => navigate(`/login`)} className="common-btn">
            Get Started
          </button>
        ) : (
          <>
            {/* ✅ If NOT admin */}
            {user.role !== "admin" ? (
              user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="common-btn"
                >
                  Get Started
                </button>
              )
            ) : (
              // ✅ If admin
              <>
                {isCreatedByAdmin ? (
                  <>
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="common-btn"
                    >
                      Study
                    </button>
                    <br />
                    <button
                      onClick={() => deleteHandler(course._id)}
                      className="common-btn"
                      style={{ backgroundColor: "red" }}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  // Admin who did NOT create this course → only Get Started
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="common-btn"
                  >
                    Get Started
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CourseCard
