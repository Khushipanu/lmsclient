import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";

const MyQueries = () => {

  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchQueries = async () => {

    try {

      const { data } = await axios.get(
        `${server}/api/query/my`,
        {
          headers: { token }
        }
      );

      setQueries(data.queries);

    } catch (error) {
      console.log("Error fetching queries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  if (loading) {
    return <p style={{ padding: "30px" }}>Loading queries...</p>;
  }

  return (

    <div style={{ padding: "30px" }}>

      <h2>My Doubts</h2>

      {queries.length === 0 ? (

        <p>No doubts asked yet</p>

      ) : (

        queries.map((q) => (

          <div
            key={q._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
              background: "#fafafa"
            }}
          >

            <p><b>Title:</b> {q.title}</p>

            <p><b>Topic:</b> {q.topic}</p>

            <p><b>Description:</b> {q.description}</p>

            <p>
              <b>Status:</b>{" "}
              {q.status === "pending" ? (
                <span style={{ color: "orange" }}>Pending</span>
              ) : (
                <span style={{ color: "green" }}>Solved</span>
              )}
            </p>

            {q.reply ? (

              <div
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "#e8f5e9",
                  borderRadius: "6px"
                }}
              >
                <b>Instructor Reply:</b>
                <p>{q.reply}</p>
              </div>

            ) : (

              <p style={{ color: "orange" }}>
                Waiting for instructor reply...
              </p>

            )}

          </div>

        ))

      )}

    </div>
  );
};

export default MyQueries;