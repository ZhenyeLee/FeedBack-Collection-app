# FeedBack-Collection-app
A full stack project with React and Node. Feel free to try: https://sleepy-harbor-41880.herokuapp.com

## Table of contents

-   [General info](#general-info)
-   [Features](#features)
-   [Technologies](#technologies)
-   [Screenshots](#screenshots)
-   [Todo List](#todo)


<h2 id="general-infor">General info</h2>

Create and send easily surveys with yes-no questions. Be informed when a user responds to the survey and get simple statistics on the amount of responses.

[See Demo here](https://emaily-app-node-react.herokuapp.com/)

<h2 id="features">Features</h2>

1. Collect surveys through emails
2. Google OAuth Authentication
3. Add WiseCrack credits throgh stripe API
4. Send surveys through emails with the help of sendGrid API

<h2 id="technologies">Technologies</h2>

1. **User Signup:** Express Server + MongoDB + PassportJS
2. **User Payment:** Stripe + MongoDB
3. **User Create Survey:** React + Redux
4. **User Enter Emails:** React + Redux + Redux Form
5. **We Send Emails:** Email Provider (SendGrid)
6. **Surveyees Click Links:** SendGrid + Express + MongoDB

<h2 id="screenshots">Screenshots</h2>

### Index page
<div align="center">
    <img src="/images/ScreenShot1.png" width="800px"</img> 
</div>

### Landing page
<div align="center">
    <img src="/images/ScreenShot2.png" width="800px"</img> 
</div>

### New Survey
<div align="center">
    <img src="/images/ScreenShot3.png" width="800px"</img> 
</div>

### Review Survey
<div align="center">
    <img src="/images/ScreenShot4.png" width="800px"</img> 
</div>

### Email Confirmation
<div align="center">
    <img src="/images/ScreenShot5.png" width="800px"</img> 
</div>


<h2 id="todo">Todo List</h2>

-   Save draft surveys
-   inport recipients list from json file
