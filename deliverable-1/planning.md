# LivingBasics
## Product Details

#### Q1: What are you planning to build?

We are planning to build a mobile app that encourages Sustainable Development Goals such as preventing pollution and human induced climate change. The app aims to make individuals live more sustainably by setting monthly themes with goals they can check off daily, and a leaderboard for people to share and compete against. The themes can be vegan month to reduce beef consumption, hydro month to reduce water and electricity use, and recycling month to reduce plastic waste. The app itself will contain a checklist of tasks to complete which matches the current theme and a calculator that quantifies their impact. A user would use this app if they want to minimize their carbon footprint, but don’t have the motivation or initiative to make the necessary changes to their life. A user would also use this app if people have the desire to improve their lifestyle, but are ignorant on how to make that happen.


#### Q2: Who are your target users?

Our target users are youth, aged 15-24, with access to a phone in North America, who are environmentally conscious, competitive, ambitious, want to improve their world, and learn about how to make an impact. We are also targeting those who want to make a positive and healthy change to their lifestyles, but don’t know where to get started, those who want to abide by a fixed regiment/schedule to improve their health, and those who need a slight push or external motivation to do many small things that eventually build up to massive positive contributions to the environment. 

#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

While social media platforms have groups that are similar to our idea, there is no app that both gamifies sustainable actions (our leaderboard), and quantifies each user’s impact with a calculator that displays how many animals they are saving / co2 emissions they are reducing. There are existing solutions that quantify a person’s impact but they are on an individual level with no easy way for people to share results and compete. Knowing what you can do is easy, but often people don't follow through. The frequent tasks on the app serve as a reminder, which is what a lot of people need and the leaderboard inspires people to improve their lifestyles and the environment. 

Examples of apps that promote sustainable development include Oroeco, Waterprint, Good Guide, and iRecycle. They all promote the improvement of one’s living and the status of the environment through the tracking of resources used and giving the user’s advice. Our app does that and more by encouraging users through a competitive element. Users have a larger incentive to improve their lifestyles and the more users compete, the better they and the 

#### Q4: How will you build it?

We will be using React Native for the front-end development, Node for the back-end, Github Actions for continuous integration, PostgreSQL for the database, and Heroku for the deployment.

Our testing strategy is to use unit, integration, and UI tests. We plan on using many unit tests because they are fast and have small costs. These tests will ensure individual pieces of code function properly. We also plan on using integration tests to ensure that different parts of the code interact with each other properly. The final tests we plan on making are UI tests. We will try not to use more UI tests than necessary because they are slow to run. We’ll also have manual testing which looks at edge cases and checks off user stories

#### Q5: What are the user stories that make up the MVP?

- As a user, I want to be able to sign up/login manually or with my Google account so I can access the site and all of its functionality. To fulfill this user story, we will need to integrate Google API and have a sign up flow and landing page in the front-end. In the back-end, we will need an API for the front-end to pass user data, to store the user information into a database, and have user authentication and email confirmation. 

- As a user, I want to be able to view all my tasks for the day so I can check which ones I will complete and feel that I have accomplished something. To accomplish this, we need to implement a checklist design and pass checked items to the back-end. In the back-end, we need an API for the front-end to pass the user’s checked items and log it into the database for the leaderboard, retrieving daily items, and seeing the monthly theme. 

- As a user, I want to be able to view the leaderboard as well as my position so I can gauge how much of a difference to the world I am making compared to others. In the back-end, we will need an efficient way for users to know their relative position and some function that keeps track of the top scores. In the front-end, we will need a dynamic leaderboard that gets its information from the back-end.

- As a user, I want to be able to view statistics/the impact calculator so I can see the direct impact I am making through quantified data. For example, I want to know the number of animals I saved and the amount of carbon emissions I reduced. In the back-end, we need to compute these statistics based on the user’s history and monthly theme. In the front-end, we need some way to display the user’s statistics. 

- As an admin, I want to be able to create new themes every month and daily tasks and add them to that month’s challenges so users can have more options when selecting what they will do to improve the world. In the back-end, we need to sync the changes the admin makes with the rest of the users. In the front-end, we need an admin panel that the admin can interact with and make the necessary additions and changes to the tasks and monthly themes.

- As a developer, I want to have a well organized repository so I can reduce code duplication and find things quicker. In order to accomplish this, we need to organize the repository folders into appropriate categories. For example, files that deal with the front-end should be separated from files that deal with the back-end. 

- As a developer, I want to set up a server on Heroku and CI/CD so when a team member pushes to the development branch, the backend is automatically updated.

----
## Intellectual Property Confidentiality Agreement 
Our partner has agreed to give us permission to share the code that we have written to potential employers. Any subsequent additions made to the application after we have finished, however, may not be shared.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

##### Kerry

Kerry is responsible for breaking down the tickets, in Trello, into the front-end and back-end tasks, managing progress on the Trello board, setting up front-end repository structure, and work on implementing front-end designs. He has experience in Vue.js for front-end development, working in sprints for breaking down tasks into tickets, and has worked extensively with Cypress for end-to-end testing. He doesn’t have much experience in setting up a database, knowledge of the best software design practices, and setting up a back-end with Express.js. 

##### Valerie

Valerie is responsible for implementing a dynamic leaderboard in the front-end and the database for the checklist in the back-end. She has proficiency with PostgreSQL, database design, and basic experience in front-end website development. She has a lack of experience with back-end development in NodeJS, React Native, and has uncertainty when creating and running tests.

##### Jayden

Jayden is responsible for implementing the back-end for admin controls and anything that anyone needs help with. He has experience working with NodeJS in the back-end and creating and running unit tests in Javascript. He lacks experience in setting up databases, React Native, and implementing anything related to the front-end. 

##### Morgan

Morgan is responsible for setting up the sign in and login in the backend and setting up the server for CI/CD. She has basic experience with building the backend of web applications and connecting it to the front-end/routing an API. She has some knowledge in building CI/CD pipelines in GitHub Actions and deploying to Heroku. She has no experience with front-end development and lacks experience with Javascript and databases.

##### Tanmay

Tanmay is responsible for implementing user tasks in the front-end and working with the logic involved with user authentication. There is experience in working with Python scripts and scrapers and some experience in React. There is a lack of experience with React Native, databases, and connecting the back-end/database to the front-end, apart from A1.

##### Zach

Zach is responsible for various backend related tasks including the implementation of the impact statistics calculator as well as maintaining and organizing the backend repository through routing, testing, and documentation through README files. He has experience developing REST APIs, including how to validate and error check incoming requests, verifying requests using JSON web tokens, and documentation according to OpenAPI specs . Through prior development experience, Zach is also proficient with Javascript and working with Node and Express.js. As for weaknesses, Zach lacks experience with databases, his knowledge being limited to only setting them up and making basic queries.

##### Andy

Andy is responsible for backend implementations such as the leaderboard system and the impact statistics backend. His strengths include proficiency in PostgreSQL and general database design. In terms of weaknesses, he lacks experience with JavaScript.

#### Q7: What operational events will you have as a team?

- **Tuesdays 5pm:** Weekly meetings with partner online via google meets. The purpose of these meetings are to update progress and to have questions answered about functionality. Each meeting should take approximately 15-60 minutes, depending on how much we have to report.

- **Tuesdays 4pm:** Weekly group meetings to ensure proper communication and progress updates. Topics include progress on development, any road blocks we may have run into and how to solve them and deciding what needs to be done next and shifting priorities accordingly.

We have had two meetings with our project partner in the last two weeks. In the first meeting, we discussed the basic functionalities and features they wanted in the application. They also showed us their designs and emailed them to us for development. As a result, we were all aware of the functionalities of the app. In the second meeting, we clarified questions regarding the leaderboard and the rights to sharing code. We updated our partner with our progress as well. Each meeting took about 15 to 20 minutes. We expect the meetings to run longer as we continue into development.

#### Q8: What artifacts will you use to self-organize?

We will use Trello to manage tickets, Google Meet to meet and discuss the details of the project, and Google Calendar to remind everyone of meeting times. Tasks will be prioritized based on how many other tasks depend on it. For example, every aspect of the project relies on the repository, so setting it up is our top priority. From there, the database needs to be set up and the user accounts need to be created. Tasks are assigned based on proficiency with the relevant tools and also how much work they have done. We will determine/track the status of work by using a sprint board. Tickets will be assigned and moved from “TO-DO”, to “In Progress”, “Blocked/ Ready for Testing”, and finally, “Complete.”

#### Q9: What are the rules regarding how your team works?

**Communications:**

Group communication is expected to be weekly, at the minimum. We will communicate on Instagram through a group chat. Communication with our partner is also expected to be weekly, more specifically, through the weekly-scheduled online meeting via Google Meet. During these meetings, it is important that we clear up any uncertainties and confusion we have about the project. We will ask questions that block our progression and through our communication with our partner, we will resolve our problems. After these issues are cleared up, our partner will be updated on our progress. Between weeks, people working on related tickets will communicate on their own.

**Meetings:**

We will take turns hosting the meetings. Although they will always be on Google Meet, someone new will be the moderator each time to ensure that the workload is fairly divided.

**Conflict Resolution:**

##### Non-responsive team members

If a team member is non-responsive, they will be contacted to determine the reason for their absence, in case there is a valid explanation. If there is no valid reason, they will be reminded of their importance in the project. Team members rely on their contribution and communication is essential in group work. 

##### Lack of contribution

To minimize confusion about who has to contribute what, there are tickets that define a task, the people doing that task, and the deadline for completion. If the deadlines aren’t met, the person unable to complete the task will be contacted to determine if help is needed. The ticket will be re-evaluated to determine how to finish it, what resources can be used, and a reasonable time frame to get the ticket done. If they are totally unresponsive and make no contributions, the issue will be brought to the attention of the TA and the ticket will be reassigned..

##### Disagreement on implementation

If there is a disagreement on how an aspect of the project should be implemented, the disagreeing parties will discuss the positives and negatives for their implementations and if needed, the disagreement will be brought to the attention of the group to further discuss the issue and come to some resolution. If the issue affects the whole team/app, then the issue will definitely be discussed by the entire team on either the group chats or during the team meetings. If there is still uncertainty, the TA will be consulted for a second opinion as they might add some information that we had not considered previously. 


----
## Highlights

1. We will have no verification system for the leaderboard. We assume all participants play ethically and responsibly. There's no incentive to win except for the satisfaction of knowing that you made significant contributions to the improvement of your own sustainable development. The alternative is to have some sort of verification system like pictures, but the amount of moderation needed can’t scale. While people may cheat, they will still have to login and check the boxes everyday, if it becomes a large issue, moderation will be introduced later.

2. We will use the existing designs as a guide, but they may not be exactly as seen. Alternatively, we could've said it would be exactly as given in the Adobe XD prototype, but we don't know yet if we can guarantee that as it might be slightly different. 

3. We initially believed that each person should be assigned a ticket. They would be responsible for implementing the back-end and front-end for the ticket they were assigned, but that would lead to several merge conflicts and a disorganized repository. We decided that it would be best to break up the tasks by features and user stories, and split that further into front-end and back-end components. There are four people responsible for implementing the back-end of the app and three responsible for implementing the front-end because our partner already has an idea of the frontend design. 

4. We decided to use React Native, Node, PostgreSQL and Heroku. This worked best given our experience and current knowledge. For the front-end implementation of the app, we chose to use React Native over Flutter because everyone has experience in JavaScript and some people have experience programming in React. For the back-end implementation, we chose Node over Python because of its faster performance and we figured that the app would be easier to create if both the front-end and back-end were implemented in the same programming language. We chose to use PostgreSQL for the implementation of the database because some of us learned PostgreSQL in CSC343 and to deploy the app, we chose Heroku because our partners recommended it and most of us used it for A1.
