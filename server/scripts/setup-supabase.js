import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseBucket = process.env.SUPABASE_BUCKET || 'rasc-uploads';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

async function run() {
  console.log('🔗 Connecting to Supabase at:', supabaseUrl);

  try {
    // 1. Check and create storage bucket
    console.log(`\n📦 Checking storage bucket "${supabaseBucket}"...`);
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      throw new Error(`Failed to list buckets: ${bucketsError.message}`);
    }

    const bucketExists = buckets.some(b => b.name === supabaseBucket);

    if (!bucketExists) {
      console.log(`⚙️  Bucket "${supabaseBucket}" not found. Creating it...`);
      const { error: createError } = await supabase.storage.createBucket(supabaseBucket, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
        fileSizeLimit: 5242880 // 5MB
      });

      if (createError) {
        throw new Error(`Failed to create bucket: ${createError.message}`);
      }
      console.log(`✅ Bucket "${supabaseBucket}" created successfully and set to public.`);
    } else {
      console.log(`✅ Bucket "${supabaseBucket}" already exists.`);
    }

    console.log('\n================================================================');
    console.log('📁 DATABASE SETUP INSTRUCTIONS');
    console.log('================================================================');
    console.log('Please log into your Supabase Dashboard:');
    console.log(`👉 https://supabase.com/dashboard/project/${supabaseUrl.split('//')[1].split('.')[0]}/sql`);
    console.log('\nOpen the SQL Editor, create a "New query", paste the following SQL, and run it:');
    console.log('\n------------------ COPY FROM HERE ------------------');
    console.log(`
-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create team table
CREATE TABLE IF NOT EXISTS public.team (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) if desired. Or disable for simplicity:
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.team DISABLE ROW LEVEL SECURITY;

-- Note: Disable storage RLS policies for simple access using Service Role key:
-- RLS check is automatically bypassed when using the Service Role Key.
`);
    console.log('------------------ COPY TO HERE ------------------');
    console.log('\nOnce you run the SQL, restart your backend server to seed the default entries.');

  } catch (err) {
    console.error('\n❌ Setup script failed:', err.message);
  }
}

run();
