import React, { useEffect, useState } from "react";
// require("dotenv").config();
import { Link } from "react-router-dom";

function AdvancedGet() {
  const [bearerToken, setBearerToken] = useState("");

  const response_type = "code";
  const client_id = "QmdUek1xLWNOampYVktWSU9QaVk6MTpjaQ";
  const redirect_uri = "https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback"; // https://oauth.pstmn.io/v1/callback
  const scope = "tweet.read%20users.read%20offline.access";
  const state = "state"; // Should be generateString()
  const code_challenge_method = "plain";

  function generateString() {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  // https://twitter.com/i/oauth2/authorize?response_type=code&client_id=QmdUek1xLWNOampYVktWSU9QaVk6MTpjaQ&state=state&scope=tweet.read%20tweet.write%20users.read&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback&code_challenge=baY_9xhjn0IveYOJARnh08W83NWLnIEnG7kouwffcu4&code_challenge_method=plain

  // So I can copy and paste the exact same URL that I was sent to from the Postman call, and yet I still get a 403...

  const KEY = encodeURIComponent("HLdbM6koXyXUyh8b77EFd7D3Z");
  const SECRET = encodeURIComponent(
    "lEN7qtoFEumzoEkkJsR3LuSKdpGzqUtwlcr0pVs1tY66Rz67O7"
  );

  // Get App-only bearerToken
  async function getBearerToken() {
    try {
      const response = await fetch("http://localhost:5000/token", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      const parseRes = await response.json(); // Get Token
      if (parseRes) {
        console.log(parseRes);
        setBearerToken(parseRes);
      }
    } catch (err) {
      console.log("Error!");
      console.log(err.message);
    }
  }

  // Use Server-Side Express Call
  // async function authorize() {
  //   try {
  //     const response = await fetch("http://localhost:5000/authorize", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //       },
  //     });
  //     const parseRes = await response.json(); // Get Token
  //     if (parseRes) {
  //       console.log(parseRes);
  //       setBearerToken(parseRes);
  //     }
  //   } catch (err) {
  //     console.log("Error!");
  //     console.log(err.message);
  //   }
  // }

  // Use Client-Side React Call
  async function authorize() {
    try {
      const response = await fetch(
        "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=QmdUek1xLWNOampYVktWSU9QaVk6MTpjaQ&state=state&scope=tweet.read%20tweet.write%20users.read&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback&code_challenge=baY_9xhjn0IveYOJARnh08W83NWLnIEnG7kouwffcu4&code_challenge_method=plain",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );
      const parseRes = await response.json(); // Get Token
      if (parseRes) {
        console.log(parseRes);
        setBearerToken(parseRes);
      }
    } catch (err) {
      console.log("Error!");
      console.log(err.message);
    }
  }

  // What header does this create?
  // const authHeader = oauth.toHeader(
  //   oauth.authorize({
  //     url: requestTokenURL,
  //     method: "POST",
  //   })
  // );

  // const req = await got.post(requestTokenURL, {
  //   headers: {
  //     Authorization: authHeader["Authorization"],
  //   },
  // });
  // if (req.body) {
  //   console.log(qs.parse(req.body));
  //   return qs.parse(req.body);
  // } else {
  //   throw new Error("Cannot get an OAuth request token");
  // }

  return (
    <div>
      <a
        href="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=QmdUek1xLWNOampYVktWSU9QaVk6MTpjaQ&state=state&scope=tweet.read%20tweet.write%20users.read&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FApp&code_challenge=baY_9xhjn0IveYOJARnh08W83NWLnIEnG7kouwffcu4&code_challenge_method=plain"
        target="_blank"
        rel="noreferrer"
      >
        Log in to Twitter
      </a>
    </div>
  );
}

export default AdvancedGet;
