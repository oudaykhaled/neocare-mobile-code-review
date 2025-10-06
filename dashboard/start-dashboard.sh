#!/bin/bash

# NEOCARE Code Review Dashboard Startup Script

echo "🏥 NEOCARE Code Review Dashboard"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to v16 or higher."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the dashboard directory."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies."
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
    echo ""
fi

echo "🚀 Starting the dashboard..."
echo ""
echo "📊 Dashboard will open at: http://localhost:3000"
echo "🔍 Features:"
echo "   • Interactive overview of all critical issues"
echo "   • Detailed markdown analysis documents"
echo "   • Responsive design for all devices"
echo "   • Severity-based navigation"
echo ""
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm start
