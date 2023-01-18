import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Redirect() {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    let authCode = GetAuthCode();
    if (authCode) {
      console.log("Authcode Granted");
      GetAccessToken(authCode);
    } else {
      navigate("/error");
    }
  }, []);

  function GetAuthCode() {
    return new URLSearchParams(location.search).get("code");
  }

  async function GetAccessToken(authCode) {
    try {
      const response = await axios.post("http://localhost:5000/accessToken", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        data: {
          authCode: authCode,
        },
      });
      const res = await response;
      if (res.data.access_token) {
        console.log("Redirect Success");
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("refreshToken", res.data.refresh_token);
        localStorage.setItem("tokenTime", Date.now());
        localStorage.setItem("loggedIn", true);
        navigate("/");
      }
    } catch (err) {
      console.log("GetAccessToken Client Failure");
      console.log(err.message);
      navigate("/error");
    }
  }

  return <div>Redirecting...</div>;
}

export default Redirect;
