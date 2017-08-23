# Boilerplate of a Slack slash command

## How to use it ?
### Informations

The project is developed with NojdeJS / Express

All JS is coded under [ES6](http://es6-features.org/) and gulp / babel are used to transpile everything

### Stack 
- NodeJS 7.4.0
- Npm 4.0.5
- ES6

### Environment

- `PORT` variable set the port of the application, if not the port bind on 3000
- `NODE_ENV` variable set the env of the app. It's **development** or **production**

### Install

The first step is to install all dependencies:

    > cd /path/to/root/folder
    > npm install

### Dev mode

To build in dev mode the project:

    > npm run dev

After that, you can reach the project at [localhost:3000](http://localhost:3000) 

### Build in production and start
To build in production mode the project:

    > npm run build
    > npm start
    
The whole app will be transpiled to es5 in the folder `dist/`

#### Deploy
To deploy, run the following command to move the transpiled files to the virtual env of the web server

    > cp dist/* path/to/target/server
    
### Clean the build

To clean the build create with the command above:

    > npm run clean

### Test

#### Check if the server is properly launched
- If you run the project in dev mode using `npm start`, check if you have the following output:
       
     > Express server listening on port 3000 in development mode

## How to integrate it in Slack ?

As the Slack doc is really nice and detailed, you can follow the tutorial below to integrate your slash command into slack

[Voir le tutorial](https://api.slack.com/tutorials/your-first-slash-command)

After the tutorial done, you will have to copy the token given by Slack and copy it into the file `/config/constants.json`
     

## Understand the source

#### Overview
All response send to Slack return the HTTP code 200 and never 401, 403 etc... because even if you have a bad credentials error Slack will only display response that are granted with the HTTP code 200. You need to handle the error into the message and send it with the HTTP code 200

#### Folder /config
This folder contains all static config files like the colors hexa code or the constant token sent by Slack.

Those file are only **JSON**

#### Folder /dist
This folder contains the transpiled source in es5. Keep in mind to always clean and build.

To clean the folder and the project:

     > npm run clean
     
To build the project and create the folder:

     > npm run build
    
#### Folder /lib
This folder contains all JS files tht are not the main app and the routes.

The **middleware.js** file handles all middleware stuff like authentication, update headers... 
[More information](http://expressjs.com/en/guide/using-middleware.html)

The **slack.js** file handles all stuff related to slack like parsing the body received or format the response to send to Slack
[More information](https://api.slack.com/)

#### Folder routes
This folders contains all routes that you have. For now we only have one example but this idea is to have on file per route and handle all http verbs inside.
