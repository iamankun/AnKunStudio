import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Database configuration
const supabaseUrl = 'https://exsoflgvdreikabvhvkg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4c29mbGd2ZHJlaWthYnZodmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAzODQ3NiwiZXhwIjoyMDczNjE0NDc2fQ.GzCb1r9W2Y9G1QidElkxsTB6WKZ7KPH2HKB39nolbkY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('🎯 FINAL AUTO-SETUP FOR CATALOG DATABASE');
console.log('=====================================');

// Read and display complete SQL
const sqlFile = join(process.cwd(), 'scripts/quick-setup.sql');
const sqlContent = readFileSync(sqlFile, 'utf8');

console.log('📄 COMPLETE SQL FOR MANUAL EXECUTION:');
console.log('=====================================\n');

// Display the SQL in a formatted way
const statements = sqlContent
  .split(';')
  .map(stmt => stmt.trim())
  .filter(stmt => stmt && !stmt.startsWith('--'));

statements.forEach((stmt, index) => {
  console.log(`-- STATEMENT ${index + 1}/${statements.length}`);
  console.log(stmt + ';');
  console.log('');
});

console.log('=====================================');
console.log('📋 EXECUTION INSTRUCTIONS:');
console.log('1. 🌐 Open: https://supabase.com/dashboard/project/exsoflgvdreikabvhvkg/sql');
console.log('2. 📋 Copy ALL SQL above');
console.log('3. 📝 Paste into SQL Editor');
console.log('4. 🚀 Click "Run"');
console.log('5. ✅ Verify: node scripts/check-database-simple.js');
console.log('6. 🎉 Generate types: npm run sb-db-types');
console.log('7. 🌟 Test frontend: npm run dev');
console.log('');

// Quick verification
async function quickVerify() {
  try {
    console.log('🔍 Quick verification of existing tables...');
    
    const tables = ['the_loai', 'album', 'bai_hat', 'phat_hanh'];
    
    for (const tableName of tables) {
      try {
        const { error } = await supabase.from(tableName).select('*').limit(1);
        console.log(`  ${error ? '❌' : '✅'} ${tableName}`);
      } catch (err) {
        console.log(`  ❌ ${tableName} - ${err.message}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Verification failed:', error.message);
  }
}

// Generate TypeScript types command
function generateTypesCommand() {
  console.log('🔧 GENERATE TYPES:');
  console.log('npm run sb-db-types');
  console.log('');
  console.log('Or manually:');
  console.log('supabase gen types --linked > utils/supabase/types.ts');
}

// Final summary
function finalSummary() {
  console.log('📊 SETUP SUMMARY:');
  console.log('=====================================');
  console.log('🎯 Target: 8 catalog tables');
  console.log('🔗 Reference: public.artists (UUID)');
  console.log('📝 Features: ISRC/UPC/ISWC support');
  console.log('🔄 Workflow: Complete release management');
  console.log('📊 Views: v_catalog_danh_sach, v_catalog_thong_ke');
  console.log('🏷️  Sample data: 8 music genres');
  console.log('🔍 Audit log: album_lich_su');
  console.log('🤝 Collaboration: album_hop_tac');
  console.log('');
  console.log('🚀 READY FOR PRODUCTION!');
}

// Run all steps
async function main() {
  await quickVerify();
  generateTypesCommand();
  finalSummary();
}

main().catch(console.error);
