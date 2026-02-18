#!/bin/bash

# Pitch Formalizer Setup Script
# This script helps you set up the Pitch Formalizer application

echo "======================================"
echo "   Pitch Formalizer Setup Script"
echo "======================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python 3 is installed"
PYTHON_VERSION=$(python3 --version)
echo "   Version: $PYTHON_VERSION"
echo ""

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip is not installed. Please install pip."
    exit 1
fi

echo "✅ pip is installed"
echo ""

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

if [ $? -eq 0 ]; then
    echo "✅ Virtual environment created"
else
    echo "❌ Failed to create virtual environment"
    exit 1
fi
echo ""

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

if [ $? -eq 0 ]; then
    echo "✅ Virtual environment activated"
else
    echo "❌ Failed to activate virtual environment"
    exit 1
fi
echo ""

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit the .env file and add your GEMINI_API_KEY"
    echo "   You can get an API key from: https://makersuite.google.com/app/apikey"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Run tests
echo "Running tests..."
python test_app.py

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "   Setup Complete! ✅"
    echo "======================================"
    echo ""
    echo "Next steps:"
    echo "1. Edit .env file and add your GEMINI_API_KEY"
    echo "2. Activate the virtual environment: source venv/bin/activate"
    echo "3. Run the application: python app.py"
    echo "4. Open http://localhost:5000 in your browser"
    echo ""
else
    echo ""
    echo "❌ Setup completed with some test failures"
    echo "   Please review the test output above"
    echo ""
fi
