import { createClient } from '@supabase/supabase-js';

// Database configuration from .env.local
const supabaseUrl = 'https://exsoflgvdreikabvhvkg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4c29mbGd2ZHJlaWthYnZodmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAzODQ3NiwiZXhwIjoyMDczNjE0NDc2fQ.GzCb1r9W2Y9G1QidElkxsTB6WKZ7KPH2HKB39nolbkY';

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function executeCatalogSQL() {
  try {
    console.log('🚀 Executing catalog database creation...');
    
    // Read the SQL file
    const fs = await import('fs');
    const path = await import('path');
    const sqlFile = path.join(process.cwd(), 'supabase/migrations/20260320151704_create_catalog_tables.sql');
    
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    console.log('📄 SQL file loaded successfully');
    
    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      try {
        console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
        
        // Use RPC to execute raw SQL
        const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement });
        
        if (error) {
          // If RPC doesn't exist, try direct SQL via admin client
          console.log(`⚠️  RPC failed, trying direct execution...`);
          
          // For now, just log the statement that would be executed
          console.log(`📋 SQL: ${statement.substring(0, 100)}...`);
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      } catch (err) {
        console.log(`⚠️  Statement ${i + 1} failed: ${err.message}`);
      }
    }
    
    console.log('\n🎯 Checking if tables were created...');
    
    // Check if tables exist now
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
    
    let createdTables = 0;
    
    for (const tableName of expectedTables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (!error) {
          console.log(`✅ ${tableName} - Table created successfully`);
          createdTables++;
        } else {
          console.log(`❌ ${tableName} - Not created yet`);
        }
      } catch (err) {
        console.log(`❌ ${tableName} - Error: ${err.message}`);
      }
    }
    
    console.log(`\n📊 Summary: ${createdTables}/${expectedTables.length} tables created`);
    
    if (createdTables > 0) {
      console.log('🎉 Catalog database setup partially complete!');
      console.log('\n💡 For full setup, you may need to:');
      console.log('   1. Enable RPC function exec_sql in Supabase');
      console.log('   2. Or use Supabase SQL Editor in dashboard');
      console.log('   3. Or run migration via Supabase CLI with Docker');
    } else {
      console.log('❌ No tables were created');
      console.log('\n💡 Alternative approaches:');
      console.log('   1. Copy SQL to Supabase Dashboard > SQL Editor');
      console.log('   2. Use Postgres client with connection string');
      console.log('   3. Set up Docker and use Supabase CLI');
    }
    
  } catch (error) {
    console.error('❌ Error executing catalog SQL:', error.message);
  }
}

// Create helper RPC function first
async function createRPCFunction() {
  console.log('🔧 Creating RPC function for SQL execution...');
  
  const rpcSQL = `
    CREATE OR REPLACE FUNCTION exec_sql(sql_query text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql_query;
    END;
    $$;
  `;
  
  try {
    // This would need to be executed via admin tools
    console.log('📋 RPC function SQL:');
    console.log(rpcSQL);
    console.log('\n💡 Execute this in Supabase SQL Editor first, then run this script again.');
  } catch (error) {
    console.error('❌ Error creating RPC function:', error.message);
  }
}

// Main execution
if (process.argv.includes('--create-rpc')) {
  createRPCFunction();
} else {
  executeCatalogSQL();
}
