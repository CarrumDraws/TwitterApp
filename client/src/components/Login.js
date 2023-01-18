import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Login() {
  const { setLoggedIn } = useAuth();

  let navigate = useNavigate();

  useEffect(() => {
    let refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      RefreshAccessToken(refreshToken);
    } else {
      console.log("No Refresh Token Found");
    }
  }, []);

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
        console.log("Refresh Token Success");
        setLoggedIn(true);
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("refreshToken", res.data.refresh_token);
        navigate("/");
      }
    } catch (err) {
      console.log("RefreshAccessToken Client Failure");
      console.log(err.message);
    }
  }

  const queries = new URLSearchParams({
    response_type: "code",
    client_id: "QmdUek1xLWNOampYVktWSU9QaVk6MTpjaQ",
    state: "state",
    // scope: "tweet.read+tweet.write+users.read", // Not percent-encoding spaces correctly
    redirect_uri: "http://localhost:3000/redirect",
    code_challenge: "challenge",
    code_challenge_method: "plain",
  }).toString();

  return (
    <div>
      Login
      <br />
      <a
        href={
          "https://twitter.com/i/oauth2/authorize?" +
          "scope=tweet.read%20tweet.write%20users.read%20offline.access&" +
          queries
        }
        target="_self"
        rel="noreferrer"
      >
        Log in to Twitter
      </a>
    </div>
  );
}

export default Login;
