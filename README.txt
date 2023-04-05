Instructions to Run:
    1. Start Server by opening a terminal, navigating to /server, and typing "node index.js"
    2. Start Client by opening a second terminal, navigating to /client, and typing "npm start"

Issues:
    - How to check if access_token is valid
    - URLSearchParams Not percent-encoding spaces correctly in /login

Questions: 
    - Should I keep the loggedIn state in localStorage, so it persists?
    - Should I check for token validity after every failed API call on dashboard?
    - How to deal with people messing around with localStorage? Use a seperate DB?
    - Context is not currently used. What should I use it for?

Todo:
    - AuthURL: Check random code_challenge is same as code_verifier
    - Encode my data when saving it to localStorage? JWT and Salting?
    - Should organize my server routes better
    - Use "proxy" param in package.json
    - Have a dev environment and prod environment

Ideas:
    - Pinterest-style gridview for Twitter