const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios").default;
require("dotenv").config();

// MIDDLEWARE ----- 
app.use(express.json()); // Allows access to req.body
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // Allows different-domain app interaction

// ROUTES -----

// Refresh Access Token with Refresh Token
app.post("/refreshAccessToken", async (req, res) => {
    try {
      const BasicAuthToken = Buffer.from(
        process.env.client_id + ":" + process.env.client_secret,
        "utf8"
        ).toString("base64"); // Encrypt Auth in Base 64
        
      const response = await axios.post(
        "https://api.twitter.com/2/oauth2/token",
        new URLSearchParams({
          refresh_token: req.body.data.refreshToken,
          grant_type: "refresh_token",
          client_id: process.env.client_id,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${BasicAuthToken}`,
          },
        }
      );
      console.log("Refresh Token Success");
      res.send(response.data);
    } catch (error) {
        console.log("Refresh Token Failed");
        res.send(error);
  }
});

// Get Access Token (OAuth 2.0 Flow)
app.post("/accessToken", async (req, res) => {
    try {
        const BasicAuthToken = Buffer.from(
            process.env.client_id + ":" + process.env.client_secret,
            "utf8"
        ).toString("base64"); // Encrypt Auth in Base 64
        
        const response = await axios.post(
            "https://api.twitter.com/2/oauth2/token",
            new URLSearchParams({
                code: req.body.data.authCode,
                grant_type: "authorization_code",
                redirect_uri: "http://localhost:3000/redirect",
                code_verifier: "challenge",
            }).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${BasicAuthToken}`,
                },
            }
        );
        console.log("Access Token Successfully Granted");
        res.send(response.data);
    } catch (error) {
        console.log("Access Token Failed");
        res.send(error);
  }
});

// Post a Tweet
app.post("/postTweet", async (req, res) => {
    try { 
        const response = await axios.post(
          "https://api.twitter.com/2/tweets",
          { text: req.body.data.text },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + req.body.data.token,
            },
          }
        );

        console.log("Tweet Posted!");
        res.send(response.data);
    } catch (error) {
        console.log("Tweet Failed to Post");
        res.send(error);
    }
})

// Revoke Token. Works for both Refresh and Access Tokens.
app.post("/revokeToken", async (req, res) => {
    try {
      const BasicAuthToken = Buffer.from(
        process.env.client_id + ":" + process.env.client_secret,
        "utf8"
        ).toString("base64"); // Encrypt Auth in Base 64
        
      const response = await axios.post(
        "https://api.twitter.com/2/oauth2/revoke",
        new URLSearchParams({
          token: req.body.data.token,
          token_type_hint: req.body.data.tokenType,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${BasicAuthToken}`,
          },
        }
      );

      console.log( req.body.data.tokenType + "Revoked Successfully");
      res.send(response.data);
    } catch (error) {
        console.error(req.body.data.tokenType + "Failed to Revoke");
        res.send(error);
    }
})

app.listen(5000, () => console.log('TwitterExp Server Started'));

// run with "node index.js"