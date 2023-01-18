import React, { useEffect, useState } from "react";

function AdvancedGet() {
  // https://twitter.com/i/oauth2/authorize?response_type=code&client_id=QmdUek1xLWNOampYVktWSU9QaVk6MTpjaQ&state=state&scope=tweet.read%20tweet.write%20users.read&redirect_uri=https%3A%2F%2Foauth.pstmn.io%2Fv1%2Fcallback&code_challenge=baY_9xhjn0IveYOJARnh08W83NWLnIEnG7kouwffcu4&code_challenge_method=plain

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
