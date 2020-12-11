# CZ3002 Data Labelling Application (LabelDat)
<img height="150" alt="image" src=https://user-images.githubusercontent.com/48685014/101879804-d6520a00-3bcc-11eb-8442-44efb28af5d2.png> 

LabelDat is a webapp designed as a one-stop portal for project owners to manage and organise the labelling of datasets, as well as to facilitate the labelling of datasets. 

Hence, project owners can upload an unlabelled dataset on the portal for other project owners and labellers to label the data. The labelled datasets can then be downloaded for pre-processing and training of machine learning models in the later stages.

## Contributors
This project is jointly developed by the following members.
* [Chiah Soon](https://github.com/chiahsoon)
* [Wilson](https://github.com/wilsonteng97)
* [Shing Ling](https://github.com/luhceeh)
* [Han Yi](https://github.com/HanYiChoong)
* [Alfredo](https://github.com/aryelciu001)
* [Kai Jie](https://github.com/Teo-KJ)
* [Jun Le](https://github.com/jlgoh)

## App Features
The following are some features of the application.

### Create labelling project and task
Create project and instructions to perform labelling task

<img height="220" alt="image" src=https://user-images.githubusercontent.com/48685014/101880134-609a6e00-3bcd-11eb-8d3d-f0682973aca5.png>

### Dashboard
Track progress with a dashboard to summarise the labelling progress of each project

<img height="220" alt="image" src=https://user-images.githubusercontent.com/48685014/101880412-d6063e80-3bcd-11eb-8cee-f6c20202e730.png> <img height="220" alt="image" src=https://user-images.githubusercontent.com/48685014/101881049-d5ba7300-3bce-11eb-9af0-5efcfd5cbcb5.png>

### Machine Learning assisted labelling
Speed up labelling task by using machine learning to suggest the label

<img height="220" alt="image" src=https://user-images.githubusercontent.com/48685014/101880573-1bc30700-3bce-11eb-864c-8d4cca17900f.png>

### User Profile and Leaderboard
Shows individual user profile and compare their labelling performance with other users through a leaderboard

<img height="220" alt="image" src=https://user-images.githubusercontent.com/48685014/101880773-6cd2fb00-3bce-11eb-8079-7759b6ea4ece.png>

### Export labelled dataset
An export function is available for the project owner to export and download the labelled dataset into device

<img height="220" alt="image" src=https://user-images.githubusercontent.com/48685014/101881158-f84c8c00-3bce-11eb-865f-aba4645a7f0a.png>

## Frontend: React.js

### Setup instructions

1. Install dependencies for frontend
   ```
   cd frontend
   npm install
   ```
2. Run development server
   ```
   npm start
   ```

## Backend: Flask

### Setup instructions

**_In Progress_**

1. Setup virtual environment, activate and install necessary packages

   For Windows :
    ```
    cd backend
    python3 -m venv venv
    venv\Scripts\activate
    pip3 install -r requirements.txt
    ```

   For Mac :
    ```
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    cd ..
    pip3 install -r requirements.txt
    ```
2. If you install other packages, please add them to requirements.txt
    ```
    cd backend
    pip3 freeze > requirements.txt
    ```
3. Start the Flask server
    ```
    cd backend
    python3 main.py
    ```

### API Endpoints
Our API endpoints are documented in this [link](https://interstellar-meadow-685701.postman.co/workspace/CZ3002-ASE~e03348d4-5ed1-43e2-b02f-8dd183f1619c/collection/12435852-ce76e0df-1771-4134-9248-13a8a0903773?ctx=documentation)

## Database: MySQL

### Setup instructions
For Windows :
1. Go to SQL's [Windows MSI Installer Download Page](https://dev.mysql.com/downloads/installer/) and follow setup instructions (Default port should be 3306)
2. Create a database for our data with the following commands on MySQL Shell.
    ```
    \sql
    \connect root@localhost
    ```
3. Type in password for root.
4. Continue with the command below on MySQL Shell.
    ```
    create schema ase;
    ```

For Mac :
1. Download mysql 8.0.x using Homebrew, then start MySQL server
    ```
   brew install mysql@8.0
   brew services start mysql
   ```
2. Create a database for our data.
    ```
    mysql -u root < "create schema ase;"
    ```
3. Change password for root user. Run `mysql -u root` first to get into mysql console. Then run this to change password to **toor** (standardised)
   ```
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'toor';
   ```
