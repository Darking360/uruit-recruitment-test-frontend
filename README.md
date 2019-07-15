# UruIT - Game Of Drones - App 🔥

[![CircleCI](https://circleci.com/gh/Darking360/uruit-recruitment-test-frontend.svg?style=svg)](https://circleci.com/gh/Darking360/uruit-recruitment-test-frontend)

This project is the frontend part of the 2 parts of the test, the other repo contains all the API related logic, it can be found here: [UruIT - Game of Drones - API](https://github.com/Darking360/uruit-recruitment-test-backend).

## Instructions to run 🐋

In this house we believe in our god Docker 🐋 so all the project is easible setup with it, so follow this simple steps:

- Clone the project
- Go to the project's directory
- Run the project with docker compose to build the complete app, use sudo if you need permissions on your machine like this:

```
docker-compose up
```

Or

```
sudo docker-compose up
```

And that's it, you should get an app running on port 3001, and accesible by going into: [http://localhost:3000](http://localhost:3000).

## But I don't like docker 😭

We got you covered, if you don't want to use it you can install all with a classic `npm install` and you're ready, like this:

- Clone the project
- Go to the project's directory
- Run npm install
- Run npm start 

And that's it 💡

## Where are the tests? 👀

You can run the tests wit docker or npm by itself running:

```
docker-compose run react npm run test
```

Or

```
sudo docker-compose run react npm run test
```

Or

```
npm run test
```

Depending on your case 👀

## Project dependencies and versions

Besides the project `package.json` dependencies, we have this dependencies if you want to take a look:

| Technology        | Version            |
| ------------- |:-------------:|
| node      | ^11.10.0 |
| npm      | ^6.7.0      |
| docker | 18.03.0-ce, build 0520e24302      |
| docker-compose | version 1.20.1, build unknown      |

## Rest of the project

This project was generated with Create React App, so you have access to all the commands inside of it, if you're using docker, you just need to run `docker-compose run react <your_command_here>` to access the commands that it gives to you, which they're going to be listed below.

[Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
