# CZ3002 Data Labelling Application (LabelDat)

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
For Windows
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

For Mac:
1. Download mysql 8.0.x using Homebrew, then start MySQL server
    ```
   brew install mysql@8.0
   brew services start mysql
   ```
2. Create a database for our data.
    ```
    mysql -u root < "create schema ase;"
    ```
