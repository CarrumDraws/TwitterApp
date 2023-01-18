import React from "react";
import { useAuth } from "../../context/AuthContext"; // Maybe pass in useAuth as prop instead
import axios from "axios";

function Dashboard() {
  const { setLoggedIn } = useAuth();

  async function postTweet() {
    try {
      const response = await axios.post("http://localhost:5000/postTweet", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          text: "Hellooo",
          token: localStorage.getItem("accessToken"),
        },
      });
      const parseRes = await response; // Get Token
      console.log(parseRes);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function revokeToken(token, tokenType) {
    try {
      const response = await axios.post("http://localhost:5000/revokeToken", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          token: token,
          tokenType: tokenType,
        },
      });
      const parseRes = await response; // Get Token
      console.log("Token Revoked");
    } catch (err) {
      console.log(err.message);
    }
  }

  function logOut(e) {
    console.log("Logging Out");
    e.preventDefault();
    localStorage.removeItem("accessToken"); // Remove accessToken from localStorage
    localStorage.removeItem("refreshToken"); // Remove refreshToken from localStorage
    revokeToken(localStorage.getItem("accessToken"), "access_token");
    revokeToken(localStorage.getItem("refreshToken"), "refresh_token");
    setLoggedIn(false);
  }

  return (
    <div>
      Dashboard
      <br />
      <button onClick={() => postTweet()}>Post Tweet</button>
      <br />
      <button onClick={(e) => logOut(e)}>Log Out</button>
    </div>
  );
}

export default Dashboard;
