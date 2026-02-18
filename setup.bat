@echo off
REM Pitch Formalizer Setup Script for Windows
REM This script helps you set up the Pitch Formalizer application

echo ======================================
echo    Pitch Formalizer Setup Script
echo ======================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

echo √ Python is installed
python --version
echo.

REM Check if pip is installed
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo X pip is not installed. Please install pip.
    pause
    exit /b 1
)

echo √ pip is installed
echo.

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

if %errorlevel% equ 0 (
    echo √ Virtual environment created
) else (
    echo X Failed to create virtual environment
    pause
    exit /b 1
)
echo.

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

if %errorlevel% equ 0 (
    echo √ Virtual environment activated
) else (
    echo X Failed to activate virtual environment
    pause
    exit /b 1
)
echo.

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

if %errorlevel% equ 0 (
    echo √ Dependencies installed successfully
) else (
    echo X Failed to install dependencies
    pause
    exit /b 1
)
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo √ .env file created
    echo.
    echo ! IMPORTANT: Please edit the .env file and add your GEMINI_API_KEY
    echo   You can get an API key from: https://makersuite.google.com/app/apikey
    echo.
) else (
    echo √ .env file already exists
    echo.
)

REM Run tests
echo Running tests...
python test_app.py

if %errorlevel% equ 0 (
    echo.
    echo ======================================
    echo    Setup Complete! √
    echo ======================================
    echo.
    echo Next steps:
    echo 1. Edit .env file and add your GEMINI_API_KEY
    echo 2. Activate the virtual environment: venv\Scripts\activate
    echo 3. Run the application: python app.py
    echo 4. Open http://localhost:5000 in your browser
    echo.
) else (
    echo.
    echo X Setup completed with some test failures
    echo   Please review the test output above
    echo.
)

pause
