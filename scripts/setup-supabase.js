#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Golden-Freezer Supabase Setup Script')
console.log('=====================================\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
const envExamplePath = path.join(process.cwd(), '.env.example')

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local from .env.example...')
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath)
    console.log('✅ .env.local created successfully!')
    console.log('⚠️  Please update the following values in .env.local:')
    console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY')
    console.log('   - SUPABASE_SERVICE_ROLE_KEY')
    console.log('   - DATABASE_URL (replace [YOUR-PASSWORD] with your actual password)')
    console.log('   - NEXTAUTH_SECRET\n')
  } else {
    console.log('❌ .env.example not found!')
    process.exit(1)
  }
} else {
  console.log('✅ .env.local already exists\n')
}

// Instructions for Supabase setup
console.log('📋 Supabase Setup Instructions:')
console.log('================================\n')

console.log('1. 🌐 Visit your Supabase Dashboard:')
console.log('   https://supabase.com/dashboard/project/jvlfkotlaiddirjkdxwo\n')

console.log('2. 🔑 Get your API Keys:')
console.log('   • Go to Settings > API')
console.log('   • Copy the "anon public" key to NEXT_PUBLIC_SUPABASE_ANON_KEY')
console.log('   • Copy the "service_role" key to SUPABASE_SERVICE_ROLE_KEY\n')

console.log('3. 🗄️ Get your Database URL:')
console.log('   • Go to Settings > Database')
console.log('   • Copy the Connection string (URI) under Connection pooling')
console.log('   • Replace [YOUR-PASSWORD] with your actual database password')
console.log('   • Update DATABASE_URL in .env.local\n')

console.log('4. 📦 Create Storage Buckets:')
console.log('   • Go to Storage in your Supabase Dashboard')
console.log('   • Create two buckets:')
console.log('     - Name: "documents" (for files like PDF, DOC, etc.)')
console.log('     - Name: "images" (for images and thumbnails)')
console.log('   • Set both buckets to "Public" if you want direct access\n')

console.log('5. 🏗️ Run Database Migrations:')
console.log('   • Go to SQL Editor in your Supabase Dashboard')
console.log('   • Copy and run the contents of:')
console.log('     - supabase/migrations/001_initial_setup.sql')
console.log('     - supabase/functions.sql\n')

console.log('6. 🔐 Configure Row Level Security (RLS):')
console.log('   • The migration script includes RLS policies')
console.log('   • Review and adjust policies in Authentication > Policies\n')

console.log('7. 🚀 Next Steps:')
console.log('   • Update your .env.local with the correct values')
console.log('   • Run: npm run db:generate')
console.log('   • Run: npm run dev')
console.log('   • Visit: http://localhost:3000\n')

console.log('8. 👤 Create Admin User:')
console.log('   • You can create admin users directly in Supabase Dashboard')
console.log('   • Go to Authentication > Users')
console.log('   • Or use the SQL Editor to insert into users table\n')

console.log('📧 Korean Blog Features Ready:')
console.log('• ✅ User authentication (admin users)')
console.log('• ✅ Blog posts with Korean content support')
console.log('• ✅ Categories and tags system')
console.log('• ✅ File uploads with Supabase Storage')
console.log('• ✅ SEO metadata management')
console.log('• ✅ Comments system with real-time updates')
console.log('• ✅ Korean text search optimization')
console.log('• ✅ Visitor analytics')
console.log('• ✅ File type support for Korean business documents (HWP, etc.)\n')

console.log('🎉 Setup complete! Follow the instructions above to finish configuration.')

// Create a simple admin user creation script
const adminUserScript = `
-- Create admin user (run this in Supabase SQL Editor after updating password)
INSERT INTO users (
  email, 
  name, 
  password, 
  role, 
  "emailVerified"
) VALUES (
  'admin@goldenf.com',
  'Golden-Freezer Admin',
  '$2a$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', -- Replace with bcrypt hash
  'SUPER_ADMIN',
  NOW()
);

-- Example of how to generate bcrypt hash in Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('your-password', 12);
-- console.log(hash);
`

fs.writeFileSync(
  path.join(process.cwd(), 'supabase', 'create-admin-user.sql'),
  adminUserScript
)

console.log('📄 Created: supabase/create-admin-user.sql for admin user creation\n')