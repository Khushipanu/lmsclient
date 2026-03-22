import React, { useEffect } from "react";
import "./CourseStudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/courseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      user &&
      user.role !== "admin" &&
      !user.subscription.includes(params.id)
    ) {
      navigate("/");
    } else {
      fetchCourse(params.id);
    }
  }, [user, params.id]);

  return (
    <>
      {course && (
        <div className="course-study-page">
          <img src={`${server}/${course.image}`} alt="" width={350} />

          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>by - {course.createdBy}</h5>
          <h5>Duration - {course.duration} weeks</h5>

          <Link to={`/lecture/${course._id}`}>
            <h2>Lectures</h2>
          </Link>

          {user &&
            user.subscription.includes(course._id) &&
            user._id !== course.createdBy && (
              <button
                className="ask-doubt-btn"
                onClick={() => navigate(`/ask-query/${course._id}`)}
              >
                Ask Doubt
              </button>
            )}
        </div>
      )}
    </>
  );
};

export default CourseStudy;
