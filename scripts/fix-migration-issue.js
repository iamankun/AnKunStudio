import { createClient } from '@supabase/supabase-js';

// Database configuration from .env.local
const supabaseUrl = 'https://exsoflgvdreikabvhvkg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4c29mbGd2ZHJlaWthYnZodmtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAzODQ3NiwiZXhwIjoyMDczNjE0NDc2fQ.GzCb1r9W2Y9G1QidElkxsTB6WKZ7KPH2HKB39nolbkY';

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createCatalogTablesDirectly() {
  try {
    console.log('🚀 Creating catalog tables directly via Supabase API...');
    
    // First, let's create the tables one by one using the service role
    const tables = [
      {
        name: 'the_loai',
        sql: `
          CREATE TABLE IF NOT EXISTS the_loai (
              id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
              ten_the_loai VARCHAR(100) NOT NULL,
              mo_ta TEXT,
              trang_thai ENUM('hoat_dong', 'ngung_hoat_dong') DEFAULT 'hoat_dong',
              ngay_tao TIMESTAMPTZ DEFAULT NOW()
          )
        `
      },
      {
        name: 'album',
        sql: `
          CREATE TABLE IF NOT EXISTS album (
              id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
              ten_album VARCHAR(255) NOT NULL,
              ma_album VARCHAR(50) UNIQUE NOT NULL,
              artist_id INT NOT NULL,
              loai_phat_hanh ENUM('album', 'single', 'ep') NOT NULL,
              mo_ta TEXT,
              anh_bia VARCHAR(500),
              ngay_phat_hanh DATE,
              nha_phan_phoi VARCHAR(255),
              the_loai_ids JSONB,
              upc VARCHAR(12),
              iswc VARCHAR(11),
              tu_khoa TEXT,
              mo_ta_ngan VARCHAR(500),
              ngon_ngu ENUM('vi', 'en') DEFAULT 'vi',
              trang_chu BOOLEAN DEFAULT FALSE,
              trang_thai_index ENUM('can_index', 'da_index', 'khong_index') DEFAULT 'can_index',
              trang_thai ENUM('da_phat_hanh', 'dang_kiem_duyet', 'ban_nhap', 'tu_choi', 'da_xoa') DEFAULT 'ban_nhap',
              ghi_chu TEXT,
              ngay_tao TIMESTAMPTZ DEFAULT NOW(),
              ngay_cap_nhat TIMESTAMPTZ DEFAULT NOW(),
              FOREIGN KEY (artist_id) REFERENCES public.artists(id)
          )
        `
      },
      {
        name: 'bai_hat',
        sql: `
          CREATE TABLE IF NOT EXISTS bai_hat (
              id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
              ten_bai_hat VARCHAR(255) NOT NULL,
              ma_bai_hat VARCHAR(50) UNIQUE,
              album_id INT,
              artist_id INT NOT NULL,
              thu_tu INT,
              thoi_luong TIME,
              file_mp3 VARCHAR(500),
              isrc VARCHAR(12),
              lyric TEXT,
              the_loai_ids JSONB,
              trang_thai ENUM('hoan_thanh', 'dang_lam', 'da_xoa') DEFAULT 'dang_lam',
              ngay_tao TIMESTAMPTZ DEFAULT NOW(),
              ngay_cap_nhat TIMESTAMPTZ DEFAULT NOW(),
              FOREIGN KEY (album_id) REFERENCES album(id) ON DELETE SET NULL,
              FOREIGN KEY (artist_id) REFERENCES public.artists(id)
          )
        `
      },
      {
        name: 'phat_hanh',
        sql: `
          CREATE TABLE IF NOT EXISTS phat_hanh (
              id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
              album_id INT NOT NULL,
              ma_phat_hanh VARCHAR(50) UNIQUE NOT NULL,
              ngay_phat_hanh_du_kien DATE,
              ngay_phat_hanh_thuc_te DATE,
              nha_phan_phoi VARCHAR(255),
              danh_sach_nen_tang JSONB,
              trang_thai ENUM('da_phat_hanh', 'dang_kiem_duyet', 'cho_phat_hanh', 'tu_choi', 'thu_hoi') DEFAULT 'dang_kiem_duyet',
              ly_do_tu_choi TEXT,
              doanh_so DECIMAL(15,2) DEFAULT 0,
              luot_nghe BIGINT DEFAULT 0,
              khu_vuc_phat_hanh JSONB,
              ngay_tu_choi DATE,
              ly_do_thu_hoi TEXT,
              so_luong_nen_tang INT DEFAULT 0,
              ngay_tao TIMESTAMPTZ DEFAULT NOW(),
              ngay_cap_nhat TIMESTAMPTZ DEFAULT NOW(),
              FOREIGN KEY (album_id) REFERENCES album(id)
          )
        `
      }
    ];

    console.log(`📝 Attempting to create ${tables.length} core tables...`);
    
    for (const table of tables) {
      try {
        console.log(`⚡ Creating table: ${table.name}`);
        
        // Since we can't execute raw SQL directly via the client,
        // we'll provide the SQL for manual execution
        console.log(`📋 SQL for ${table.name}:`);
        console.log(table.sql);
        console.log('---');
        
      } catch (error) {
        console.log(`❌ Error creating ${table.name}: ${error.message}`);
      }
    }
    
    console.log('\n🎯 SOLUTION:');
    console.log('1. Copy the SQL statements above');
    console.log('2. Go to: https://supabase.com/dashboard/project/exsoflgvdreikabvhvkg/sql');
    console.log('3. Paste and execute each SQL statement');
    console.log('4. Run verification: node scripts/check-database-simple.js');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Alternative approach: Use the direct SQL file
async function provideDirectSolution() {
  console.log('🔧 DIRECT SOLUTION:');
  console.log('\n1. Open: https://supabase.com/dashboard/project/exsoflgvdreikabvhvkg/sql');
  console.log('2. Copy content from: scripts/quick-setup.sql');
  console.log('3. Paste and click "Run"');
  console.log('4. Verify with: node scripts/check-database-simple.js');
  
  console.log('\n📄 Quick SQL Preview:');
  console.log('-- Copy this to Supabase SQL Editor --');
  console.log('CREATE TABLE IF NOT EXISTS the_loai (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, ten_the_loai VARCHAR(100) NOT NULL, mo_ta TEXT, trang_thai ENUM(\'hoat_dong\', \'ngung_hoat_dong\') DEFAULT \'hoat_dong\', ngay_tao TIMESTAMPTZ DEFAULT NOW());');
  console.log('CREATE TABLE IF NOT EXISTS album (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, ten_album VARCHAR(255) NOT NULL, ma_album VARCHAR(50) UNIQUE NOT NULL, artist_id INT NOT NULL REFERENCES public.artists(id), loai_phat_hanh ENUM(\'album\', \'single\', \'ep\') NOT NULL, trang_thai ENUM(\'da_phat_hanh\', \'dang_kiem_duyet\', \'ban_nhap\', \'tu_choi\', \'da_xoa\') DEFAULT \'ban_nhap\', ngay_tao TIMESTAMPTZ DEFAULT NOW());');
}

// Run the solution
if (process.argv.includes('--direct')) {
  provideDirectSolution();
} else {
  createCatalogTablesDirectly();
}
