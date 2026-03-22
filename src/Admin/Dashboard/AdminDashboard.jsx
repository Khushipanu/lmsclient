import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./AdminDashboard.css";


const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Double-check admin role - redirect if not admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return null; // Don't render anything while redirecting
  }

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLectures: 0,
    totalUsers: 0,
  });
  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div>
      <Layout>
        <div className="main-content">
          <div className="box">
            <p>My Courses</p>
            <p>{stats.totalCourses}</p>
          </div>
          <div className="box">
            <p>Total Lectures</p>
            <p>{stats.totalLectures}</p>
          </div>
          <div className="box">
            <p>Enrolled Users</p>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
      </Layout>

      <Link to="/instructor">Student Queries</Link>
    </div>
  );
};

export default AdminDashboard;
