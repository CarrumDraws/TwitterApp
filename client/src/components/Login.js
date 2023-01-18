import React from "react";

function Login() {
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
