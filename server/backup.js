const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios").default;
// MIDDLEWARE -----
app.use(express.json()); // Allows access to req.body
app.use(cors()); // Allows different-domain app interaction

// ROUTES -----

// Get App-only bearerToken
app.get("/token", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.twitter.com/oauth2/token",
      "",
      {
        params: {
          grant_type: "client_credentials",
        },
        auth: {
          username: "HLdbM6koXyXUyh8b77EFd7D3Z",
          password: "lEN7qtoFEumzoEkkJsR3LuSKdpGzqUtwlcr0pVs1tY66Rz67O7",
        },
      }
    );
    // let parseRes = await response.json();
    console.log(JSON.parse(JSON.stringify(response.data)));
    res.send(JSON.parse(JSON.stringify(response.data)));
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

// Get Access Token (Step 2 of OAuth2.0 w/PKCE)
app.post("/accesstoken", async (req, res) => {
  try {
    const BasicAuthToken = Buffer.from(
      // <client_id> : <client_secret>
      "QmdUek1xLWNOampYVktWSU9QaVk6MTpjaQ:YxmeL5xamDf6_qdCVOUM2Z7J6Tx9fffjZZa-VS2hr-5OCbK3TR",
      "utf8"
    ).toString("base64"); // Encrypt Auth in Base 64

    const response = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      new URLSearchParams({
        // URL-Encoded Body
        code: "TjlpTTZlYUNSOC1uNGliYU5oODJrQTJZUzJHR1NEWVhZQjRBNldhTEt0VWhBOjE2NzMyMzU4MTU3MDc6MToxOmFjOjE",
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/Dashboard",
        code_verifier: "challenge",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${BasicAuthToken}`,
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

// Post a Tweet
app.get("/postTweet", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.twitter.com/2/tweets",
      { text: "Hello World" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer VWxKVHI2MTlWT29ES1M4c1cxNTczYkNkQTVsbG1zOF8yT0V1NnRIRVRacU9aOjE2NzMyMzU4MzI3NzU6MToxOmF0OjE",
        },
      }
    );
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.listen(5000, () => console.log("TwitterExp Server Started"));

// run with "node index.js"
