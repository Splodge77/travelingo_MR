# Setting up an Express App from Scratch
### Terminal commands to set up files and dependencies

```
> curl https://www.gitignore.io/api/node -o .gitignore
> cp ~/code_clan/reference_files/.eslintrc.js ./
> echo .eslintrc.js >> .gitignore
> echo .tern-project  >> .gitignore
> git init
> git add -A
> git commit -m "Initial Commit"
> npm init
> npm install --save-dev webpack
> npm install webpack-cli -D
> npm install --save-dev nodemon
> npm install --save-dev mocha  
> npm install --save body-parser
> npm install --save mongodb
> npm install --save express  
```

### Essential file contents
- In package.json make sure you have the following:
  - version numbers can be different...

```

  "name": "bucket_list",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "mocha client/src/models/specs",
    "start": "nodemon server.js",
    "webpack": "cd client && webpack -w"
  },
  "author": "DocLJN",
  "license": "ISC",
  "devDependencies": {
    "mocha": "^5.0.1",
    "nodemon": "^1.17.1",
    "webpack": "^4.0.1"
  },
  "dependencies": {
    "body-parser": "^1.18.2",
    "express": "^4.16.2",
    "mongodb": "^3.0.3"
  }
}

```

- In the root directory of the project

```
mkdir client
mkdir controllers
touch server.js
```

- in the client directory:

```
touch webpack.config.js
```

  - paste in

```
config = {
  entry: __dirname + "/src/app.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/build"
  },
  devtool: "source-map",
  mode: "development"
};

module.exports = config;
```

- File structure

![screenshot of file structure](file_structure.png)
![screenshot of starting file structure](starting_file_structure.png)

### Express Server
- To make a basic express server.js file

```

```



### To actually start the app

- In your terminal: one tab per process all run from the root directory of the project i.e. where server.js is found

```
> npm run webpack (builds bundle.js files)
> mongod (starts database).
> mongo (opens database)
> nodemon server.js (start server to run at local host)
```

- **NB** closing the terminal does not stop the processes
- if you get an error when running any of those commands, check the Activity Monitor and kill any process that shouldn't be running
