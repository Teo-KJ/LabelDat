# CZ3002 Data Labelling Application

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
   ```
   cd backend
   python3 -m venv .
   . bin/activate
   pip3 install -r requirements.txt
   ```
2. If you install other packages, please add them to requirements.txt
   ```
   cd backend
   pip3 freeze > requirements.txt
   ```

## Database: MySQL

### Setup instructions (for Mac, not sure about Windows)
1. Download mysql 8.0.x using Homebrew, then start MySQL server
    ```
   brew install mysql@8.0
   brew services start mysql
   ```
2. Create a database for our data.
    ```
    mysql -u root < "create schema ase;"
    ```