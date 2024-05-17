# plantapp
## Installation instruction
### Install Node.js
***1. Windows***
- Visit the official Node.js website.
- Download the Long Term Support(LTS) version for Windows
- Run the installer and follow the on-screen instructions.
- After installation, you can verify that Node.js and npm (Node Package Manager) are installed by opening a command prompt and typing:

#####
    node -v
#####
    npm -v

This should display the installed versions of Node.js and npm

***2. MacOS***
- Can use **Homebrew** to install Node.js. If you don’t have Homebrew installed, you can
install it by following the instructions on the Homebrew website.
- Once Homebrew is installed, open a terminal and run:
#####
    brew install node
- After installation, verify Node.js and npm by typing:
#####
    node -v
#####
    npm -v

***3. Linux (Debian/Ubuntu)***
- Open a terminal and run the following commands:
#####
    sudo apt update
#####
    sudo apt install nodejs npm
- After installation, verify Node.js and npm by typing:
#####
    node -v
#####
    npm -v

***4. Linux (Fedora)***
- Open a terminal and run the following commands:
#####
    sudo dnf install nodejs
- After installation, verify Node.js and npm by typing:
#####
    node -v
#####
    npm -v

***5.  Other Linux Distributions:***
- The package manager and installation steps may vary depending on your Linux distribution.
Consult your distribution’s documentation for specific instructions.

### Install MongoDB
***1. Windows***
- There is a detailed tutorial on the MongoDB website - [install-mongodb-on-windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
- Visit the [Downloads Center](https://www.mongodb.com/try/download/community) and download the MongoDB Community Server
    - Version: 7.0.X
    - Platform: Windowsx64
    - Package: msi
- Run the installer and make sure that you install MongoDB as a service. More details can be found in the [MongoDB Tutorial](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/).

-  Installing **MongoDB Compass (GUI)**
    - Visit the [Downloads Center](https://www.mongodb.com/try/download/community)
    - Scroll down, on the left hand side column: Tools > [MongoDB Compass (GUI)](https://www.mongodb.com/try/download/compass)
    - Version: 1.42.1 (Stable)
    - Platform: Windows 64-bit(10+)
    - Package: exe
- Starting the **MongoDB Server**
    - Open a *Command Prompt* window as *an administrator*
    - Navigate to the bin directory of your MongoDB installation. The **default location** is typically *C:\Program Files\MongoDB\Server\\**version**\bin*. (Replace ***version*** with your actual MongoDB version number).
    - Run the following command:
    #####
        mongod --config="<path\_to\_your\_config\_file>"

    Replace **<path_to_your_config_file>** with the actual path to your configuration file. 
    
    If you haven’t created one, you can use the default settings by omitting the *–config* argument.

***2. MacOS***
- There is a detailed tutorial on the MongoDB website - [install-mongodb-on-os-x](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/).
- If you do not have brew installed, please install
**homebrew** by going to their website.

- Installing **MongoDB 7.0 Community Edition**
    - Tap the MongoDB Homebrew Tap to download the official Homebrew formula for MongoDB and the Database Tools, by running the following command in your macOS Terminal: 
    #####
        brew tap mongodb/brew

    - If you have already done this for a previous installation of MongoDB, you can skip this step. To update Homebrew and all existing formulae: 
    #####
        brew update
    - To install MongoDB, run the following command in your macOS Terminal application: 
    #####
        brew install mongodb-community@7.0

-  Installing **MongoDB Compass (GUI)**
    - In order to install MongoDB compass, you can use the following command: 
    #####
        brew install --cask mongodb-compass

- Starting the **MongoDB Server**
    - In order to start the MongoDB server, you can use the command: 
    #####
        brew services start mongodb-community

***3. Linux***
- In order to install MongoDB you can follow the [tutorial](https://www.mongodb.com/docs/manual/administration/install-on-linux/) available on the MongoDB website.

## Running Instructions
### Set up MongoDB database
1. Run MongoDB Compass app
2. In *New Connection*, put **mongodb://localhost:27017/** in URI
3. Connect
4. If there is no existing database called **users**, then add a database called **users**
5. In **users** database, create a collection called **plants**
6. Navigate to **plants** collection to view data

### Run the code
1. Open a terminal
2. Navigate to the solution using **cd \plantapp\solution**
3. Run **npm install** to ensure everything is installed correctly
4. Run by using **npm run start**

### Run the website on browser
1. Open a web browser
2. Insert **http://localhost:3000/** in URL field
3. The website is now running
