Issues:
    - When logged in, /redirect isn't autonav-ing to /.
    - How to check if access_token is valid
    - Do I check for token validity after every failed API call on dashboard?


Questions: 
    - Do I need Login.js to have RefreshAccessToken?
    - Should I keep the loggedIn state in localStorage, so it persists?

Todo:
    - /redirect should go to ERROR anytime it is accessed directly
    - Elegantly deal with accessToken expiry such that you dont need to request a new accessToken every single refresh

    - Implement Error Page
    - Check for valid tokens, incase the user changes them

    - Encode my data when saving it to localStorage?