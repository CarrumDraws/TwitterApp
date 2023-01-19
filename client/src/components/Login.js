import React from "react";

function Login() {
  function genState() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 50; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const queries = new URLSearchParams({
    response_type: "code",
    client_id: process.env.REACT_APP_CLIENT_ID,
    state: genState(),
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
        Login With Twitter
      </a>
    </div>
  );
}

export default Login;
