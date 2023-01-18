import React, { useEffect, useState } from "react";

function BasicGet() {
  const [singleTweet, setSingleTweet] = useState("");
  const [timelineTweets, setTimelineTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);

  // Single Tweet
  useEffect(() => {
    const tweetId = "1603634329384542210";
    async function getSingleTweet() {
      try {
        const response = await fetch(
          `https://api.twitter.com/2/tweets/${tweetId}`,
          {
            method: "GET",
            headers: {
              "User-Agent": "v2TweetLookupJS",
              Authorization:
                "Bearer AAAAAAAAAAAAAAAAAAAAANhkiwEAAAAAF56TU5JdsRplH7Nt7kgsqggyhkI%3DtqRfAeeszXqlYrbyhFA5TsRGuZB6dYYqDTYRsRTLaghgF1OEFH",
            },
          }
        );
        const parseRes = await response.json(); // Get Token
        if (parseRes) {
          setSingleTweet(parseRes.data.text);
          console.log(parseRes.data.text);
        }
      } catch (err) {
        console.log("Error!");
        console.log(err.message);
      }
    }
    getSingleTweet();
  }, []);

  // User Tweet Timeline
  // useEffect(() => {
  //   const userId = "270132611";
  //   async function getTimelineTweets() {
  //     try {
  //       const response = await fetch(
  //         `https://api.twitter.com/2/users/${userId}/tweets`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization:
  //               "Bearer AAAAAAAAAAAAAAAAAAAAANhkiwEAAAAAF56TU5JdsRplH7Nt7kgsqggyhkI%3DtqRfAeeszXqlYrbyhFA5TsRGuZB6dYYqDTYRsRTLaghgF1OEFH",
  //           },
  //         }
  //       );
  //       const parseRes = await response.json(); // Get Token
  //       if (parseRes) {
  //         setTimelineTweets(parseRes.data);
  //         console.log(parseRes.data);
  //       }
  //     } catch (err) {
  //       console.log("Error!");
  //       console.log(err.message);
  //     }
  //   }
  //   getTimelineTweets();
  // }, []);

  // User Likes
  // useEffect(() => {
  //   const userId = "270132611";
  //   async function getLikedTweets() {
  //     try {
  //       const response = await fetch(
  //         `https://api.twitter.com/2/users/${userId}/liked_tweets?max_results=10`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization:
  //               "Bearer AAAAAAAAAAAAAAAAAAAAANhkiwEAAAAAF56TU5JdsRplH7Nt7kgsqggyhkI%3DtqRfAeeszXqlYrbyhFA5TsRGuZB6dYYqDTYRsRTLaghgF1OEFH",
  //           },
  //         }
  //       );
  //       const parseRes = await response.json(); // Get Token
  //       if (parseRes) {
  //         setLikedTweets(parseRes.data);
  //         console.log(parseRes.data);
  //       }
  //     } catch (err) {
  //       console.log("Error!");
  //       console.log(err.message);
  //     }
  //   }
  //   getLikedTweets();
  // }, []);

  return (
    <div>
      Single Tweet: {singleTweet}
      <br />
      <br />
      {/* Timeline Tweets:
      {timelineTweets.map((tweetData, index) => (
        <div key={index}>
          Tweet {index}: {tweetData.text}
          <br />
        </div>
      ))}
      <br />
      Liked Tweets:
      {likedTweets.map((tweetData, index) => (
        <div key={index}>
          Tweet {index}: {tweetData.text}
          <br />
        </div>
      ))} */}
    </div>
  );
}

export default BasicGet;
