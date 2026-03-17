import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserData } from "../../context/UserContext.jsx";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchUser } = UserData();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Save token and refresh user state
    localStorage.setItem("token", token);
    fetchUser().finally(() => {
      navigate("/");
    });
  }, [searchParams, fetchUser, navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Signing you in with Google...</h2>
    </div>
  );
};

export default AuthSuccess;

