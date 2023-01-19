import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  let navigate = useNavigate();

  useEffect(() => {
    checkTokenValidity();
  }, []);

  // Refreshes Access_Token if expired
  async function checkTokenValidity() {
    let secondsSinceRefresh =
      (Date.now() - localStorage.getItem("tokenTime")) / 1000;
    if (secondsSinceRefresh > 7200) {
      console.log(
        "Refresh Token Expired. " +
          secondsSinceRefresh +
          " seconds since last Refresh."
      );
      RefreshAccessToken(localStorage.getItem("refreshToken"));
    } else {
      console.log(
        "Refresh Token Fresh. " + secondsSinceRefresh + "/7200 Seconds Left."
      );
    }
  }

  async function RefreshAccessToken(refreshToken) {
    try {
      const response = await axios.post(
        "http://localhost:5000/refreshAccessToken",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          data: {
            refreshToken: refreshToken,
          },
        }
      );
      const res = await response;
      if (res.data.access_token) {
        console.log("Dashboard RefreshAccessToken() Success");
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("refreshToken", res.data.refresh_token);
        localStorage.setItem("tokenTime", Date.now());
        localStorage.setItem("loggedIn", true);
      }
    } catch (err) {
      console.log("Dashboard RefreshAccessToken() Failure");
      console.log(err.message);
      logOut();
    }
  }

  async function postTweet(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/postTweet", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          text: "Hello World",
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
      await axios.post("http://localhost:5000/revokeToken", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          token: token,
          tokenType: tokenType,
        },
      });
      console.log("Token Revoked");
    } catch (err) {
      console.log(err.message);
    }
  }

  function logOut() {
    console.log("Logging Out");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenTime");
    localStorage.removeItem("loggedIn");
    revokeToken(localStorage.getItem("accessToken"), "access_token");
    revokeToken(localStorage.getItem("refreshToken"), "refresh_token");
    navigate("/login");
  }

  return (
    <div>
      Dashboard
      <br />
      <button onClick={(e) => postTweet(e)}>Tweet "Hello World"</button>
      <br />
      <button onClick={() => logOut()}>Log Out</button>
    </div>
  );
}

export default Dashboard;
