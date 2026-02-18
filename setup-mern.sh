#!/bin/bash

# MERN Stack Setup Script for Pitch Formalizer
# This script helps you set up both backend and frontend

echo "======================================"
echo "   Pitch Formalizer MERN Setup"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js is installed"
NODE_VERSION=$(node --version)
echo "   Version: $NODE_VERSION"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm is installed"
NPM_VERSION=$(npm --version)
echo "   Version: $NPM_VERSION"
echo ""

# Backend Setup
echo "========== Backend Setup =========="
echo "Installing backend dependencies..."
cd backend

if npm install; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating backend .env file..."
    cp .env.example .env
    echo "✅ Backend .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit backend/.env and add your GEMINI_API_KEY"
    echo "   You can get an API key from: https://makersuite.google.com/app/apikey"
    echo ""
else
    echo "✅ Backend .env file already exists"
    echo ""
fi

cd ..

# Frontend Setup
echo "========== Frontend Setup =========="
echo "Installing frontend dependencies..."
cd frontend

if npm install; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Final instructions
echo ""
echo "======================================"
echo "   Setup Complete! ✅"
echo "======================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Edit backend/.env file and add your GEMINI_API_KEY"
echo "   Get your key from: https://makersuite.google.com/app/apikey"
echo ""
echo "2. Start the backend server:"
echo "   cd backend"
echo "   npm start"
echo ""
echo "3. In a NEW terminal, start the frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "For development with auto-reload:"
echo "   Backend: npm run dev (requires nodemon)"
echo "   Frontend: npm run dev"
echo ""
