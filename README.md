# softh__
--------------------------------------------------------------------------------------
* clone repo from github => git clone https://github.com/An31/softh__.git

* create a package.json => 
	>> npm init -y
* install express => 
	>> npm install --save express
* install body-parser => 
	>> npm install --save body-parser 
  This is a node.js middleware for handling JSON, Raw, Text and URL
  encoded form data.
* install body-parser => 
	>> npm install --save consolidate
  This is for rendering html files. 
* install path => 
	>> npm install --save path
* install multer => 
	>> npm install --save multer
  This is a node.js middleware for handling multipart/form-data. Which I don't use.

Note: With --save flag we are adding dependencies to package.json file.
Note: With installing these modules one will obtain change in package.json file, as well as a new directory "node_modules"
* create a /public folder, add /public/index.html
* create a /server.js.
* change a package.json => 
	"main":server.js, "author": Anel Husakovic
* Create a simple working scenario => 

  * write a code for a server.js, I used express.router.
  * start it using >> node server.js in cmd, 
    or if change has been made in package.json under "scripts" and to a keyword "start" is assigned value "node server.js", then you can also start it with >> npm start.
	Note: if you get in console when running the server "undefined" it is because console.log from handler function returns NULL
  * start it on local machine in your browser run: localhost:3000
  * start using heroku
  + Configure heroku.
   - set nodejs on heroku
   - nodejs version : node -v  => v6.9.4
   - npm version : npm -v  => v3.10.10
   - git version : git --version  => v2.8.1
   - Go through the link[Links => Heroku ] bellow to configure heroku (or see Appendix 2).

  + See heroku version : >> heroku --version => heroku-cli/6.15
  + Run >> git remote -v and see which remote is configured for this directory. 
	You should probably have : origin fetch/push https://github.com/An31/softh__.git (fetch/push)
  + To create a remote called "heroku" (you can change a name of remote)
	- run : >> heroku git:remote -a softh (softh is a name of created app on my heroku account) 
		=> 	   heroku fetch/push  https://git.heroku.com/softh.git
	  or you can specify : >> heroku create <name of application> 
		=>	it will automatically create a app on heroku as well as a remote.
	  or you can add remote manually, url should start with https://git.heroku.com/<application_name_on_heroku.git>: 
		=>	>> git remote add <name of remote (doesn't need to be "heroku")> <url>		
    - now when we run (there are 2 remotes): >> git remote -v 
		=> 	heroku fetch/push https://git.heroku.com/softh.git
			origin fetch/push https://github.com/An31/softh__.git
  + Use git to track changes using: "git status", "git add", "git commit".
  + After creating a remote use :
	- >> git log -2 (see last 2 commits), if you have a "initial commit" create a new one. 
	- >> git status (you will see what is staged, what is unstaged).
	Note: After you are satisfied with what has been done, you should go on the next line.
	- You can create one .gitignore and to put some rules: https://github.com/github/gitignore/blob/master/Node.gitignore
	  If you are on windows machine, to obtain .gitignore from cmd : 
	  => >> ren gitignore.txt .gitignore
	  or just create a file ".gitignore."(without extension).
	  Note: I had a problem while deploying application to heroku -> I think the problem was with .gitignore, so use default .gitignore from "getting started with heroku"  
    - To stage a commits: >> git add .  (or better add it interactivly:  >> git add -i) 
	- >> git commit -m "version x " --author="name <mail>" 
		=>	git commit -m "simple working scenario" --author="Anel Husakovic <anel_1002@hotmail.com>"
		Note: You can merge the proces of adding and commiting with flag -am in >> git commit -am "something" 
	- Use a Procfile : Heroku needs this Procfile, so create one and put "web: node server.js"
	- Now we need to push the changes to heroku master:
		>> git push heroku master (from template >> git push <remote> <branch>)
		Note: to see in which branch we are use : >> git branch -v => master
		Note: If you have some deatached state of commits, and to be sure you are on latest version of your changes
			  use instead: >> git push heroku HEAD:master  
	- Enable at least 1 dyno : heroku ps:scale web=1
	  Note: this should be automatically done by heroku.
	After this commands we should have deployed app on heroku.
  + To open heroku app use: >> heroku open or go to the link https://softh.herokuapp.com/
  + If you have a problem with heroku run from terminal : >> heroku logs -t or go to heroku.com and see logs for your application

* To handle a twitter: 
  + As a reference use api : https://github.com/ttezel/twit
  + As stated install: 
	=>	>> npm install twit --save   [--save is needed to reference a package in package.json]
  + Create twitter app https://apps.twitter.com/ in order to obtain consumer key and access token.
  + Create a .env file put your consumer key and access token information, which will be used by application and do configure at #beggining of your app:
	=> require('dotenv').configure
	=> To use the variable <token> => process.env.token

* Using MongoDB:
	- To install MongoDB follow the link:
		https://www.mongodb.com/
	- Check the compatibilities:
		https://docs.mongodb.com/manual/installation/
		I used comunity version on windows 7,use Complete instalation, uncheck Mongo Compass. You should also use cloud-mongodb atlas.
	- After installing go to directory (let's call that path [mongodb]): C:\Program Files\MongoDB\Server\3.6\bin  
	- There will be 2 main .exe files : mongod(server) and mongo(client - command line interaction CLI).
	- In order to start the server, it is expecting to have a directory where it can store data (default: C:\data\db), so create that directory in C:\.
		Alternativly create a directory local to your project .\data\db and specify it with --dbpath flag: 
			>> mongod --dbpath "C:\Users\anel\Desktop\softh__\data\db"
	- To run the server type either in Windows Explorer of a path[mongodb]"cmd", or create a environment variable to call .exe files (related to mongodb or other programs) from cmd.
	- To run the client navigate to softh_v0 directory and run: mongo (before make sure you added enviroment variable to a "Path" variable) and run 
			+ db - gives you a "test" db - to check which db you are currently using.
			+ use - create or switch if db exists.
			+ db.dropDatabase() - will delete current database
			+ show databases - admin,config and local databases => returns {"ok":1}
			+ show collections - []
			+ db.posts.insert(
			{
			"text": "Ovo je neki string"
			}); - create and use inside db "posts" collection and insert some data; 
			+ db.posts.find()[.pretty()] - find all data that are in "posts" collection
			+ db.posts.findOne(); - find only 1. element
			+ db.posts.drop(); - drop collection
	- Notes about SQL and noSQL:
		- Database  = Database
		- Table  = Collection
		- Row  = Document
		- Index  = Index
		- Join  = Lookup
		- Foreign Key  = Reference
		
* To handle a mongodb in our project:
	+ Install it with npm, to get update in package.json ["mongodb": "^3.0.2"]:
		>> npm install mongodb --save
		- There was a problem[not a problem, just less coding - notes are written in a code]about 3.0.2 so I switched to 2.2.33:
			>> npm uninstall mongodb --save
			>> npm install mongodb@2.2.33 --save
		If running locally you need to run >> npm install 
			
	+ Create inside local folder a directory "\data\db"
	+ Start on localhost (mongodb 3.6 is boundled to localhost by default) server by running :
		>> mongod --dbpath ".\data\db"
		[server is running on port 27017]
	+ Run a client with in a new terminal with: 
		>> mongo 
	+ Inside client create a database called "postsdb": 
		>> use posts; 
	+ See the code for further reading		
	+ To use remote database, we will be using https://mlab.com/ that has a free Sandbox 500MB remote mongo database.
	  Configure mlab, create a postsdb with collection posts, add a new user with password, save the url to database and proceed.
	+ Also create a config variable on heroku : MONGODB and add a link to mlab.com from previous step.
	
* To handle Mustache 
	>> npm install consolidate mustache --save		
	
* Appendinx 1:
	- /data
		- db
	- /public
	- /routes
		- index.js
	- /views
		-/pages
			- index.html
			- index_.ejs
			- save_data.html
		- error.html
	- .gitignore
	- package.json
	- Procfile
	- Readme.md
	- server.js
	
* Links:
[1] Html rendering
http://stackoverflow.com/questions/16111386/error-cannot-find-module-html/24140944#24140944
https://www.npmjs.com/package/consolidate

[2] Mustache
https://www.youtube.com/watch?v=vIXfKaUmbTY

[3] Mongodb
https://www.youtube.com/watch?v=Do_Hsb_Hs3c
https://www.mongodb.com/presentations/back-to-basics-2-your-first-mongodb-application

[4] Deploy Mongodb on heroku
https://www.youtube.com/watch?v=GDqtv1eGGpA

[5] Heroku 
https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up


* Appendix 2

# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
