
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
