import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";

const InstructorQueries = () => {

  const [queries, setQueries] = useState([]);
  const [replyText, setReplyText] = useState({});

  const token = localStorage.getItem("token");

  const fetchQueries = async () => {
    try {

      const { data } = await axios.get(
        `${server}/api/query/instructor`,
        {
          headers: { token }
        }
      );

      setQueries(data.queries);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);


  const sendReply = async (id) => {

    const reply = replyText[id];

    // clear textarea immediately
    setReplyText({
      ...replyText,
      [id]: ""
    });

    try {

      await axios.put(
        `${server}/api/query/status/${id}`,
        {
          status: "solved",
          reply: reply
        },
        {
          headers: { token }
        }
      );

      alert("Reply sent");

      fetchQueries();

    } catch (error) {
      console.log(error);
    }
  };


  return (

    <div style={{ padding: "30px" }}>

      <h2>Student Doubts</h2>

      {queries.length === 0 ? (

        <p>No Queries Yet</p>

      ) : (

        queries.map((q) => (

          <div
            key={q._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px"
            }}
          >

            <p><b>Student:</b> {q.student?.name}</p>

            <p><b>Course:</b> {q.course?.title}</p>

            <p><b>Title:</b> {q.title}</p>

            <p><b>Description:</b> {q.description}</p>


            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  background: q.status === "pending" ? "#d4edda" : "#f8d7da",
                  color: q.status === "pending" ? "#155724" : "#721c24",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  fontWeight: "bold"
                }}
              >
                {q.status}
              </span>
            </p>


            {q.status === "pending" && (

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

                <textarea
                  placeholder="Write your reply..."
                  value={replyText[q._id] || ""}
                  onChange={(e) =>
                    setReplyText({
                      ...replyText,
                      [q._id]: e.target.value
                    })
                  }
                  style={{
                    flex: 1,
                    padding: "10px"
                  }}
                />

                <button
                  onClick={() => sendReply(q._id)}
                  style={{
                    padding: "10px 15px"
                  }}
                >
                  Send
                </button>

              </div>

            )}

          </div>

        ))

      )}

    </div>

  );
};

export default InstructorQueries;