import React, { useState } from "react";
import axios from "axios";
import { server } from "../../main";
import { useParams } from "react-router-dom";
import "./Query.css";

const AskQuery = () => {

  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: ""
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } = await axios.post(
        `${server}/api/query/create/${courseId}`,
        formData,
        {
          headers: {
            token: token
          }
        }
      );

      alert(data.message);

      setFormData({
        title: "",
        description: "",
        topic: ""
      });

    } catch (error) {
      console.log(error);
      alert("Error submitting query");
    }
  };

  return (
    <div className="query-container">

      <h2>Ask Your Doubt</h2>

      <form onSubmit={handleSubmit} className="query-form">

        <label>Query Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter your doubt title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Topic</label>
        <input
          type="text"
          name="topic"
          placeholder="Example: React Hooks / MongoDB"
          value={formData.topic}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Explain your doubt clearly..."
          value={formData.description}
          onChange={handleChange}
          rows="6"
          required
        />

        <button type="submit">
          Submit Query
        </button>

      </form>

    </div>
  );
};

export default AskQuery;