# 📊 SUPABASE DASHBOARD SETUP INSTRUCTIONS

## 🚀 **QUICK SETUP via Supabase Dashboard**

### **Step 1: Open Supabase Dashboard**
1. Go to: https://supabase.com/dashboard
2. Select your project: `exsoflgvdreikabvhvkg`
3. Navigate to **SQL Editor** (in the left sidebar)

### **Step 2: Execute Catalog SQL**

#### **Option A: Copy-Paste Full SQL**
1. Open file: `supabase/migrations/20260320151704_create_catalog_tables.sql`
2. Copy the entire content
3. Paste into Supabase SQL Editor
4. Click **"Run"** button

#### **Option B: Execute Step-by-Step**
Copy and run these sections in order:

```sql
-- 1. Create basic tables
CREATE TABLE the_loai (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ten_the_loai VARCHAR(100) NOT NULL,
    mo_ta TEXT,
    trang_thai ENUM('hoat_dong', 'ngung_hoat_dong') DEFAULT 'hoat_dong',
    ngay_tao TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE album (
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
);
```

```sql
-- 2. Create remaining tables
CREATE TABLE bai_hat (
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
);

CREATE TABLE phat_hanh (
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
);
```

```sql
-- 3. Create supporting tables
CREATE TABLE thong_ke (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    album_id INT NOT NULL,
    loai_thong_ke ENUM('luot_nghe', 'luot_tai', 'doanh_thu', 'tuong_tac') NOT NULL,
    gia_tri BIGINT NOT NULL,
    ngay_du_lieu DATE NOT NULL,
    nen_tang VARCHAR(100),
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (album_id) REFERENCES album(id)
);

CREATE TABLE artist_album (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    artist_id INT NOT NULL,
    album_id INT NOT NULL,
    vai_tro ENUM('chinh', 'hop_tac', 'sang_tac', 'san_xuat') DEFAULT 'chinh',
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (artist_id) REFERENCES public.artists(id),
    FOREIGN KEY (album_id) REFERENCES album(id),
    UNIQUE KEY unique_artist_album (artist_id, album_id, vai_tro)
);
```

```sql
-- 4. Create advanced tables
CREATE TABLE album_hop_tac (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    album_id INT NOT NULL,
    artist_id INT NOT NULL,
    vai_tro ENUM('primary_artist', 'featured_artist', 'producer', 'songwriter', 'composer', 'engineer') NOT NULL,
    ty_le_royalty DECIMAL(5,2) DEFAULT 0.00,
    trang_thai ENUM('da_moi', 'da_chap_nhan', 'tu_choi') DEFAULT 'da_moi',
    ngay_moi DATE,
    ngay_chap_nhan DATE,
    ghi_chu TEXT,
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (album_id) REFERENCES album(id),
    FOREIGN KEY (artist_id) REFERENCES public.artists(id),
    UNIQUE KEY unique_album_artist_role (album_id, artist_id, vai_tro)
);

CREATE TABLE album_lich_su (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    album_id INT NOT NULL,
    hanh_dong ENUM('tao_moi', 'cap_nhat', 'doi_trang_thai', 'xoa', 'phat_hanh') NOT NULL,
    gia_tri_cu JSONB,
    gia_tri_moi JSONB,
    nguoi_thuc_hien INT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (album_id) REFERENCES album(id)
);

CREATE TABLE album_tag (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    album_id INT NOT NULL,
    ten_tag VARCHAR(50) NOT NULL,
    loai_tag ENUM('the_loai', 'nhan_hieu', 'campaign', 'season') NOT NULL,
    trang_thai ENUM('hoat_dong', 'ngung_hoat_dong') DEFAULT 'hoat_dong',
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (album_id) REFERENCES album(id),
    UNIQUE KEY unique_album_tag (album_id, ten_tag)
);
```

```sql
-- 5. Add constraints
ALTER TABLE bai_hat
ADD CONSTRAINT chk_isrc_format 
CHECK (isrc IS NULL OR isrc ~ '^[A-Z]{2}-[A-Z0-9]{3}-[0-9]{2}-[0-9]{5}$');

ALTER TABLE album
ADD CONSTRAINT chk_upc_format 
CHECK (upc IS NULL OR upc ~ '^[0-9]{12}$');

ALTER TABLE album
ADD CONSTRAINT chk_iswc_format 
CHECK (iswc IS NULL OR iswc ~ '^[A-Z]-[0-9]{3}\.[0-9]{6}\.[0-9]{2}$');

ALTER TABLE bai_hat
ADD CONSTRAINT uq_isrc UNIQUE (isrc);

ALTER TABLE album_hop_tac
ADD CONSTRAINT chk_royalty_percent 
CHECK (ty_le_royalty >= 0 AND ty_le_royalty <= 100);
```

```sql
-- 6. Create views
CREATE OR REPLACE VIEW v_catalog_danh_sach AS
SELECT 
    a.id,
    a.ten_album,
    a.ma_album,
    a.loai_phat_hanh,
    a.ngay_phat_hanh,
    a.trang_thai,
    a.anh_bia,
    art.name as ten_nghesi,
    art.slug as artist_slug,
    ph.trang_thai as trang_thai_phat_hanh,
    CASE 
        WHEN a.anh_bia IS NOT NULL AND a.anh_bia != '' THEN a.anh_bia
        ELSE NULL
    END as anh_bia_url
FROM album a
JOIN public.artists art ON a.artist_id = art.id
LEFT JOIN phat_hanh ph ON a.id = ph.album_id
WHERE a.trang_thai != 'da_xoa'
ORDER BY a.ngay_tao DESC;

CREATE OR REPLACE VIEW v_catalog_thong_ke AS
SELECT 
    COUNT(*) as tong_so_ban_nhay,
    SUM(CASE WHEN trang_thai = 'da_phat_hanh' THEN 1 ELSE 0 END) as da_phat_hanh,
    SUM(CASE WHEN trang_thai = 'dang_kiem_duyet' THEN 1 ELSE 0 END) as dang_kiem_duyet,
    SUM(CASE WHEN trang_thai = 'ban_nhap' THEN 1 ELSE 0 END) as ban_nhap,
    SUM(CASE WHEN trang_thai = 'tu_choi' THEN 1 ELSE 0 END) as tu_choi
FROM album
WHERE trang_thai != 'da_xoa';
```

```sql
-- 7. Insert sample data
INSERT INTO the_loai (ten_the_loai, mo_ta) VALUES
('Pop', 'Nhạc pop phổ thông'),
('Rock', 'Nhạc rock mạnh mẽ'),
('Jazz', 'Nhạc jazz tinh tế'),
('Classical', 'Nhạc cổ điển'),
('Hip-Hop', 'Nhạc hip-hop hiện đại'),
('Electronic', 'Nhạc điện tử'),
('R&B', 'Rhythm and Blues'),
('Country', 'Nhạc đồng quê');
```

### **Step 3: Verify Setup**

After running the SQL, check if tables were created:

```sql
-- List all catalog tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'the_loai', 'album', 'bai_hat', 'phat_hanh', 
    'thong_ke', 'artist_album', 'album_hop_tac', 
    'album_lich_su', 'album_tag'
  )
ORDER BY table_name;
```

```sql
-- Test views
SELECT * FROM v_catalog_thong_ke;

SELECT * FROM v_catalog_danh_sach LIMIT 5;
```

### **Step 4: Generate TypeScript Types**

```bash
# Generate types from linked project
supabase gen types --linked > utils/supabase/types.ts
```

### **Step 5: Test Frontend Integration**

```bash
# Start development server
npm run dev
```

## 🔧 **Alternative: Direct Database Connection**

If you prefer using a database client:

**Connection String:**
```
postgres://postgres.exsoflgvdreikabvhvkg:FQifIIiPL74YoFRV@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Tools:**
- **DBeaver** (Free)
- **pgAdmin** (Free)
- **TablePlus** (Paid)
- **DataGrip** (Paid)

## 🎯 **After Setup Complete**

1. **Check database:** `node scripts/check-database-simple.js`
2. **Generate types:** `npm run sb-db-types`
3. **Test frontend:** `npm run dev`
4. **Browse catalog:** Visit `http://localhost:3000/catalog`

## 🚨 **Troubleshooting**

### **Common Issues:**
- **"relation does not exist"** → Tables not created yet
- **"permission denied"** → Use service role key
- **"foreign key violation"** → Create tables in correct order

### **Solutions:**
1. Execute SQL in correct order (basic tables first)
2. Use service role key for admin operations
3. Check foreign key references to public.artists

---

**🎉 Once complete, your catalog database will be ready for production use!**
