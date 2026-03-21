import { createClient } from '@supabase/supabase-js';

// Database configuration from .env.local
const supabaseUrl = 'https://exsoflgvdreikabvhvkg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4c29mbGd2ZHJlaWthYnZodmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAzODQ3NiwiZXhwIjoyMDczNjE0NDc2fQ.GzCb1r9W2Y9G1QidElkxsTB6WKZ7KPH2HKB39nolbkY';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDatabase() {
  try {
    console.log('🔍 Checking catalog tables...');
    
    // Check if our catalog tables exist by testing simple queries
    const expectedTables = [
      'the_loai',
      'album', 
      'bai_hat',
      'phat_hanh',
      'artist_album',
      'album_hop_tac',
      'album_lich_su',
      'album_tag'
    ];
    
    console.log('\n🎯 Checking catalog tables:');
    
    for (const tableName of expectedTables) {
      try {
        // Try to select 1 row from each table
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (error) {
          if (error.code === 'PGRST116') {
            console.log(`  ❌ ${tableName} - Table does not exist`);
          } else {
            console.log(`  ⚠️  ${tableName} - Error: ${error.message}`);
          }
        } else {
          console.log(`  ✅ ${tableName} - Table exists (${data?.length || 0} rows)`);
        }
      } catch (err) {
        console.log(`  ❌ ${tableName} - Connection error: ${err.message}`);
      }
    }
    
    // Test database connection
    console.log('\n🔗 Testing database connection...');
    const { data: testData, error: testError } = await supabase
      .from('album')
      .select('count(*)')
      .limit(1);
    
    if (testError) {
      console.log('  ❌ Database connection failed:', testError.message);
      console.log('\n💡 To create tables, run:');
      console.log('   supabase db push');
    } else {
      console.log('  ✅ Database connection successful!');
    }
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  }
}

// Run the check
checkDatabase();
