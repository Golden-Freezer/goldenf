#!/bin/bash
# Cloudflare Pages build script for Next.js static export

echo "🔨 Building Next.js static export for Cloudflare Pages..."

# Ensure we're using the correct Node version
NODE_VERSION=$(node -v)
echo "Node version: $NODE_VERSION"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build the Next.js app
echo "🏗️ Building Next.js app..."
npm run build

# Verify the output directory exists
if [ ! -d "out" ]; then
    echo "❌ Error: 'out' directory not found. Build failed."
    exit 1
fi

# Count files in output
FILE_COUNT=$(find out -type f | wc -l)
echo "✅ Build complete! Generated $FILE_COUNT files in 'out' directory."

# Display build info
echo "📊 Build summary:"
du -sh out
echo "---"
ls -la out/

exit 0