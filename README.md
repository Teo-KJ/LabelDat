# CZ3002 Data Labelling Application (LabelDat)
LabelDat is a webapp designed as a one-stop portal for project owners to manage and organise the labelling of datasets, as well as to facilitate the labelling of datasets. 

Hence, project owners can upload an unlabelled dataset on the portal for other project owners and labellers to label the data. The labelled datasets can then be downloaded for pre-processing and training of machine learning models in the later stages.

## Contributors
This project is jointly developed by the following members.
* Chiah Soon
* Wilson
* Shing Ling
* Han Yi
* Alfredo
* Kai Jie
* Jun Le

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

## API Endpoints
Our API endpoints are documented in this [link](https://interstellar-meadow-685701.postman.co/workspace/CZ3002-ASE~e03348d4-5ed1-43e2-b02f-8dd183f1619c/collection/12435852-ce76e0df-1771-4134-9248-13a8a0903773?ctx=documentation)