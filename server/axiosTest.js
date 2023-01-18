const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios").default; // provides autocomplete and parameter typings

app.get("/one", (req, res) => {
    axios.get("https://jsonplaceholder.typicode.com/posts?userId=1") // Format 1
        .then(function (response) { // Success
            console.log(response);
        })
        .catch(function (error) {  // Fail
            console.log(error);
        })
        .then(function () { // Always Executed
            console.log("Done");
        });
})
app.get("/two", (req, res) => {
    axios.get("https://jsonplaceholder.typicode.com/posts", { // Format 2
        params: {
          userId: 1, // Queries Here!
        },
      })
      .then(function (response) { // Success
        console.log(response);
      })
      .catch(function (error) { // Fail
        console.log(error);
      })
      .then(function () { // Always Executed
        console.log("Done");
      });
});

app.listen(5000, () => console.log("axiosTest Server Started"));