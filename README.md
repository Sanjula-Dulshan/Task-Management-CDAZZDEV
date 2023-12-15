# Task-Management-CDAZZDEV

# Technical Assessment

I create a simple MERN stack application that allows users to manage a list of tasks. This application have below features:

- User can create a task with a title and description
- Display a list of tasks
- Mark a task as completed
- Delete a task
- Simple login and register (I create it very simple, because this assessment is not about authentication)

I deploy this application to Netlify. You can access it using below link. https://task-management-cdazzdev-sanjula-dulshans-projects.vercel.app/

## Deployment Instructions

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

Clone the project

```bash
  git clone https://github.com/Sanjula-Dulshan/task_web_app.git
```

Go to the project directory

```bash
  cd task_web_app
```

Then navigate to the api directory

```bash
  cd api
```

Install dependencies

```bash
  npm install
```

Rename `.env.example` file to `.env`

```
DATABASE= <MongoDB connection string>
TOKEN_SECRET= <Token secret key>
PORT= <Api Port no>
```

Start the server

```bash
  npm run start
```

Then navigate to the web directory

```bash
  cd web
```

Open the `Config.js` file in `src` directory and add `API_URL` given below format

```bash
  http://localhost:<YOUR_API_RUNNING_PORT>;
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Now you can go to the register page and create a new account and login to the system. Then you can create, update, delete and mark as complete tasks.Also you can use below credentials to login to the system

```bash
  email: sdulshan10@gmail.com
  password: 12345678
```
