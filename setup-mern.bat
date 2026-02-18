@echo off
REM MERN Stack Setup Script for Pitch Formalizer (Windows)
REM This script helps you set up both backend and frontend

echo ======================================
echo    Pitch Formalizer MERN Setup
echo ======================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

echo √ Node.js is installed
node --version
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X npm is not installed. Please install npm.
    pause
    exit /b 1
)

echo √ npm is installed
npm --version
echo.

REM Backend Setup
echo ========== Backend Setup ==========
echo Installing backend dependencies...
cd backend

npm install
if %errorlevel% equ 0 (
    echo √ Backend dependencies installed
) else (
    echo X Failed to install backend dependencies
    pause
    exit /b 1
)

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating backend .env file...
    copy .env.example .env
    echo √ Backend .env file created
    echo.
    echo ! IMPORTANT: Please edit backend\.env and add your GEMINI_API_KEY
    echo   You can get an API key from: https://makersuite.google.com/app/apikey
    echo.
) else (
    echo √ Backend .env file already exists
    echo.
)

cd ..

REM Frontend Setup
echo ========== Frontend Setup ==========
echo Installing frontend dependencies...
cd frontend

npm install
if %errorlevel% equ 0 (
    echo √ Frontend dependencies installed
) else (
    echo X Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

REM Final instructions
echo.
echo ======================================
echo    Setup Complete! √
echo ======================================
echo.
echo Next steps:
echo.
echo 1. Edit backend\.env file and add your GEMINI_API_KEY
echo    Get your key from: https://makersuite.google.com/app/apikey
echo.
echo 2. Start the backend server:
echo    cd backend
echo    npm start
echo.
echo 3. In a NEW command prompt, start the frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo For development with auto-reload:
echo    Backend: npm run dev (requires nodemon)
echo    Frontend: npm run dev
echo.

pause
