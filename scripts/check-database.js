import { createClient } from '@supabase/supabase-js';

// Database configuration from .env.local
const supabaseUrl = 'https://exsoflgvdreikabvhvkg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4c29mbGd2ZHJlaWthYnZodmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAzODQ3NiwiZXhwIjoyMDczNjE0NDc2fQ.GzCb1r9W2Y9G1QidElkxsTB6WKZ7KPH2HKB39nolbkY';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDatabase() {
  try {
    console.log('🔍 Checking database tables...');
    
    // Get all tables
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .order('table_name');
    
    if (tablesError) {
      console.error('❌ Error fetching tables:', tablesError);
      return;
    }
    
    console.log('📋 Tables in database:');
    if (tables && tables.length > 0) {
      tables.forEach((table, index) => {
        console.log(`  ${index + 1}. ${table.table_name}`);
      });
    } else {
      console.log('  No tables found');
    }
    
    // Check if our catalog tables exist
    const expectedTables = [
      'the_loai',
      'album', 
      'bai_hat',
      'phat_hanh',
      'thong_ke',
      'artist_album',
      'album_hop_tac',
      'album_lich_su',
      'album_tag'
    ];
    
    console.log('\n🎯 Checking catalog tables:');
    const existingTables = tables?.map(t => t.table_name) || [];
    
    expectedTables.forEach(tableName => {
      const exists = existingTables.includes(tableName);
      const status = exists ? '✅' : '❌';
      console.log(`  ${status} ${tableName}`);
    });
    
    // If tables don't exist, offer to create them
    const missingTables = expectedTables.filter(table => !existingTables.includes(table));
    if (missingTables.length > 0) {
      console.log(`\n⚠️  Missing tables: ${missingTables.join(', ')}`);
      console.log('\n💡 To create tables, run:');
      console.log('   supabase db push');
    } else {
      console.log('\n🎉 All catalog tables exist!');
    }
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  }
}

// Run the check
checkDatabase();
