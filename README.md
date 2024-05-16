# plantapp
## Installation instruction
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
```mongod --config="<path\_to\_your\_config\_file>"```
Replace **<path_to_your_config_file>** with the actual path to your configuration file. If you
haven’t created one, you can use the default settings by omitting the –config argument.

***2. MacOS***
- There is a detailed tutorial on the MongoDB website - [install-mongodb-on-os-x](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/).
- If you do not have brew installed, please install
homebrew by going to their website.

- Installing **MongoDB 7.0 Community Edition**
    - Tap the MongoDB Homebrew Tap to download the official Homebrew formula for MongoDB and the Database Tools, by running the following command in your macOS Terminal: ```brew tap mongodb/brew```

    - If you have already done this for a previous installation of MongoDB, you can skip this step. To update Homebrew and all existing formulae: ```brew update```
    - To install MongoDB, run the following command in your macOS Terminal application: ```brew install mongodb-community@7.0```

-  Installing **MongoDB Compass (GUI)**
    - In order to install MongoDB compass, you can use the following command: ```brew install --cask mongodb-compass```

- Starting the **MongoDB Server**
    - In order to start the MongoDB server, you can use the command: ```brew services start mongodb-community```

***3. Linux***
- In order to install MongoDB you can follow the [tutorial](https://www.mongodb.com/docs/manual/administration/install-on-linux/) available on the MongoDB website.

