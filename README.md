# PollingApp
This is polling web app created in nodejs and mongodb with bootstrap, html and jquery

### Prerequisites

Below are the softwares and tools you need to install before contributing/running this web-app

* [NodeJS](https://nodejs.org/en/) - Install NodeJS(v6.11.5 or later)
* [Git](https://git-scm.com/) - Git for version control
* [MongoDB](https://www.mongodb.com/download-center?jmp=homepage#community) - Install latest community server
* [Robo 3T](https://robomongo.org/download) - Install RoboMongo 3T
* [Atom](https://atom.io/) Atom Editor, This is optional, you can work with any editor/IDE

### How to Contribute

* Install all Prerequisites
* Fork the project
* Clone the repository
* Open Terminal and go to PollingApp directory and Run ``` npm install --save``` This fetch all the node module dependecy. Make sure you do not push this while contributing to project
* Start the mongodb server by running the command in terminal ```sudo service mongod start``` Windows user can normally start the mongodb.Please refere [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) for details
* Once the server is started, Start the mongo shell(For Ubuntu type mongo in terminal, for windows use Robo3T/RoboMongo) Now open the ```mongo.script``` file of this project and copy the content and paste it in mongo shell. Make sure all commands run successfully.
* Now you are ready with DB, Collections and some sample dummy data ready into your mongodb
* Go to project folder and Start server using ```nodemon index.js```
* We are using nodemon plugin so you no need to restart the server for any changes, it automatically restarts the server after saving any changes.
* Boom..! That's it! Now start coding :)

### Contact me for any help
