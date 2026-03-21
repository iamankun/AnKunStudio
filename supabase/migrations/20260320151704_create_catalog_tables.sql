-- ========================================
-- CATALOG TABLES MIGRATION
-- ========================================
-- Created: 2026-03-20
-- Purpose: Music catalog management system
-- Compatible with: public.artists table

-- ========================================
-- 1. BẢNG THE_LOAI (GENRES)
-- ========================================
CREATE TABLE IF NOT EXISTS the_loai (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ten_the_loai VARCHAR(100) NOT NULL,
    mo_ta TEXT,
    trang_thai VARCHAR(20) DEFAULT 'hoat_dong' CHECK (trang_thai IN ('hoat_dong', 'ngung_hoat_dong')),
    ngay_tao TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ten_the_loai ON the_loai(ten_the_loai);
CREATE INDEX IF NOT EXISTS idx_trang_thai ON the_loai(trang_thai);

-- ========================================
-- 2. BẢNG ALBUM (ALBUMS/SINGLES/EP)
-- ========================================
CREATE TABLE IF NOT EXISTS album (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ten_album VARCHAR(255) NOT NULL,
    ma_album VARCHAR(50) UNIQUE NOT NULL,
    artist_id UUID NOT NULL,
    loai_phat_hanh VARCHAR(10) NOT NULL CHECK (loai_phat_hanh IN ('album', 'single', 'ep')),
    mo_ta TEXT,
    anh_bia VARCHAR(500),
    ngay_phat_hanh DATE,
    nha_phan_phoi VARCHAR(255),
    the_loai_ids JSONB,
    upc VARCHAR(12),
    iswc VARCHAR(11),
    tu_khoa TEXT,
    mo_ta_ngan VARCHAR(500),
    ngon_ngu VARCHAR(2) DEFAULT 'vi' CHECK (ngon_ngu IN ('vi', 'en')),
    trang_chu BOOLEAN DEFAULT FALSE,
    trang_thai_index VARCHAR(20) DEFAULT 'can_index' CHECK (trang_thai_index IN ('can_index', 'da_index', 'khong_index')),
    trang_thai VARCHAR(20) DEFAULT 'ban_nhap' CHECK (trang_thai IN ('da_phat_hanh', 'dang_kiem_duyet', 'ban_nhap', 'tu_choi', 'da_xoa')),
    ghi_chu TEXT,
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    ngay_cap_nhat TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (artist_id) REFERENCES public.artists(id)
);

CREATE INDEX IF NOT EXISTS idx_ma_album ON album(ma_album);
CREATE INDEX IF NOT EXISTS idx_album_artist ON album(artist_id);
CREATE INDEX IF NOT EXISTS idx_album_trang_thai ON album(trang_thai);
CREATE INDEX IF NOT EXISTS idx_album_ngay_phat_hanh ON album(ngay_phat_hanh);
CREATE INDEX IF NOT EXISTS idx_album_loai_phat_hanh ON album(loai_phat_hanh);
CREATE INDEX IF NOT EXISTS idx_album_trang_chu ON album(trang_chu);

-- ========================================
-- 3. BẢNG BAI_HAT (TRACKS)
-- ========================================
CREATE TABLE IF NOT EXISTS bai_hat (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    ten_bai_hat VARCHAR(255) NOT NULL,
    ma_bai_hat VARCHAR(50) UNIQUE,
    album_id INT,
    artist_id UUID NOT NULL,
    thu_tu INT,
    thoi_luong TIME,
    file_mp3 VARCHAR(500),
    isrc VARCHAR(12),
    lyric TEXT,
    the_loai_ids JSONB,
    trang_thai VARCHAR(20) DEFAULT 'dang_lam' CHECK (trang_thai IN ('hoan_thanh', 'dang_lam', 'da_xoa')),
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    ngay_cap_nhat TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (album_id) REFERENCES album(id) ON DELETE SET NULL,
    FOREIGN KEY (artist_id) REFERENCES public.artists(id)
);

CREATE INDEX IF NOT EXISTS idx_ma_bai_hat ON bai_hat(ma_bai_hat);
CREATE INDEX IF NOT EXISTS idx_bai_hat_album ON bai_hat(album_id);
CREATE INDEX IF NOT EXISTS idx_bai_hat_artist ON bai_hat(artist_id);
CREATE INDEX IF NOT EXISTS idx_bai_hat_isrc ON bai_hat(isrc);
CREATE INDEX IF NOT EXISTS idx_bai_hat_thu_tu ON bai_hat(album_id, thu_tu);
CREATE INDEX IF NOT EXISTS idx_bai_hat_trang_thai ON bai_hat(trang_thai);

-- ========================================
-- 4. BẢNG PHAT_HANH (RELEASES)
-- ========================================
CREATE TABLE IF NOT EXISTS phat_hanh (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    album_id INT NOT NULL,
    ma_phat_hanh VARCHAR(50) UNIQUE NOT NULL,
    ngay_phat_hanh_du_kien DATE,
    ngay_phat_hanh_thuc_te DATE,
    nha_phan_phoi VARCHAR(255),
    danh_sach_nen_tang JSONB,
    trang_thai VARCHAR(20) DEFAULT 'dang_kiem_duyet' CHECK (trang_thai IN ('da_phat_hanh', 'dang_kiem_duyet', 'cho_phat_hanh', 'tu_choi', 'thu_hoi')),
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

CREATE INDEX IF NOT EXISTS idx_ma_phat_hanh ON phat_hanh(ma_phat_hanh);
CREATE INDEX IF NOT EXISTS idx_phat_hanh_album ON phat_hanh(album_id);
CREATE INDEX IF NOT EXISTS idx_phat_hanh_trang_thai ON phat_hanh(trang_thai);
CREATE INDEX IF NOT EXISTS idx_phat_hanh_ngay ON phat_hanh(ngay_phat_hanh_thuc_te);
CREATE INDEX IF NOT EXISTS idx_phat_hanh_nha_phan_phoi ON phat_hanh(nha_phan_phoi);

-- ========================================
-- 5. BẢNG THONG_KE (STATISTICS)
-- ========================================
CREATE TABLE IF NOT EXISTS thong_ke (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    album_id INT NOT NULL,
    loai_thong_ke VARCHAR(20) NOT NULL CHECK (loai_thong_ke IN ('luot_nghe', 'luot_tai', 'doanh_thu', 'tuong_tac')),
    gia_tri BIGINT NOT NULL,
    ngay_du_lieu DATE NOT NULL,
    nen_tang VARCHAR(100),
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (album_id) REFERENCES album(id)
);

CREATE INDEX IF NOT EXISTS idx_thong_ke_album_date ON thong_ke(album_id, ngay_du_lieu);
CREATE INDEX IF NOT EXISTS idx_thong_ke_type_date ON thong_ke(loai_thong_ke, ngay_du_lieu);
CREATE INDEX IF NOT EXISTS idx_thong_ke_nen_tang ON thong_ke(nen_tang);

-- ========================================
-- 6. BẢNG ARTIST_ALBUM (MANY-TO-MANY RELATIONSHIP)
-- ========================================
CREATE TABLE IF NOT EXISTS artist_album (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    artist_id UUID NOT NULL,
    album_id INT NOT NULL,
    vai_tro VARCHAR(20) DEFAULT 'chinh' CHECK (vai_tro IN ('chinh', 'hop_tac', 'sang_tac', 'san_xuat')),
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (artist_id) REFERENCES public.artists(id),
    FOREIGN KEY (album_id) REFERENCES album(id),
    UNIQUE (artist_id, album_id, vai_tro)
);

CREATE INDEX IF NOT EXISTS idx_artist_album_artist ON artist_album(artist_id);
CREATE INDEX IF NOT EXISTS idx_artist_album_album ON artist_album(album_id);
CREATE INDEX IF NOT EXISTS idx_artist_album_vai_tro ON artist_album(vai_tro);

-- ========================================
-- 7. BẢNG ALBUM_HOP_TAC (ALBUM COLLABORATORS)
-- ========================================
CREATE TABLE IF NOT EXISTS album_hop_tac (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    album_id INT NOT NULL,
    artist_id UUID NOT NULL,
    vai_tro VARCHAR(20) NOT NULL CHECK (vai_tro IN ('primary_artist', 'featured_artist', 'producer', 'songwriter', 'composer', 'engineer')),
    ty_le_royalty DECIMAL(5,2) DEFAULT 0.00,
    trang_thai VARCHAR(20) DEFAULT 'da_moi' CHECK (trang_thai IN ('da_moi', 'da_chap_nhan', 'tu_choi')),
    ngay_moi DATE,
    ngay_chap_nhan DATE,
    ghi_chu TEXT,
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (album_id) REFERENCES album(id),
    FOREIGN KEY (artist_id) REFERENCES public.artists(id),
    UNIQUE (album_id, artist_id, vai_tro)
);

CREATE INDEX IF NOT EXISTS idx_album_hop_tac_album ON album_hop_tac(album_id);
CREATE INDEX IF NOT EXISTS idx_album_hop_tac_artist ON album_hop_tac(artist_id);
CREATE INDEX IF NOT EXISTS idx_album_hop_tac_vai_tro ON album_hop_tac(vai_tro);
CREATE INDEX IF NOT EXISTS idx_album_hop_tac_trang_thai ON album_hop_tac(trang_thai);

-- ========================================
-- 8. BẢNG ALBUM_LICH_SU (AUDIT LOG)
-- ========================================
CREATE TABLE IF NOT EXISTS album_lich_su (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    album_id INT NOT NULL,
    hanh_dong VARCHAR(20) NOT NULL CHECK (hanh_dong IN ('tao_moi', 'cap_nhat', 'doi_trang_thai', 'xoa', 'phat_hanh')),
    gia_tri_cu JSONB,
    gia_tri_moi JSONB,
    nguoi_thuc_hien INT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (album_id) REFERENCES album(id)
);

CREATE INDEX IF NOT EXISTS idx_album_lich_su_album_action ON album_lich_su(album_id, hanh_dong);
CREATE INDEX IF NOT EXISTS idx_album_lich_su_date ON album_lich_su(ngay_tao, hanh_dong);
CREATE INDEX IF NOT EXISTS idx_album_lich_su_nguoi ON album_lich_su(nguoi_thuc_hien);

-- ========================================
-- 9. BẢNG ALBUM_TAG (ALBUM TAGS/LABELS)
-- ========================================
CREATE TABLE IF NOT EXISTS album_tag (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    album_id INT NOT NULL,
    ten_tag VARCHAR(50) NOT NULL,
    loai_tag VARCHAR(20) NOT NULL CHECK (loai_tag IN ('the_loai', 'nhan_hieu', 'campaign', 'season')),
    trang_thai VARCHAR(20) DEFAULT 'hoat_dong' CHECK (trang_thai IN ('hoat_dong', 'ngung_hoat_dong')),
    ngay_tao TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (album_id) REFERENCES album(id),
    UNIQUE (album_id, ten_tag)
);

CREATE INDEX IF NOT EXISTS idx_album_tag_album ON album_tag(album_id);
CREATE INDEX IF NOT EXISTS idx_album_tag_ten ON album_tag(ten_tag);
CREATE INDEX IF NOT EXISTS idx_album_tag_loai ON album_tag(loai_tag);
CREATE INDEX IF NOT EXISTS idx_album_tag_type ON album_tag(loai_tag, ten_tag);

-- ========================================
-- 10. CONSTRAINTS & VALIDATIONS
-- ========================================

-- ISRC format validation
ALTER TABLE bai_hat
DROP CONSTRAINT IF EXISTS chk_isrc_format;
ALTER TABLE bai_hat
ADD CONSTRAINT chk_isrc_format 
CHECK (isrc IS NULL OR isrc ~ '^[A-Z]{2}-[A-Z0-9]{3}-[0-9]{2}-[0-9]{5}$');

-- UPC format validation
ALTER TABLE album
DROP CONSTRAINT IF EXISTS chk_upc_format;
ALTER TABLE album
ADD CONSTRAINT chk_upc_format 
CHECK (upc IS NULL OR upc ~ '^[0-9]{12}$');

-- ISWC format validation
ALTER TABLE album
DROP CONSTRAINT IF EXISTS chk_iswc_format;
ALTER TABLE album
ADD CONSTRAINT chk_iswc_format 
CHECK (iswc IS NULL OR iswc ~ '^[A-Z]-[0-9]{3}\.[0-9]{6}\.[0-9]{2}$');

-- Unique ISRC constraint
ALTER TABLE bai_hat
DROP CONSTRAINT IF EXISTS uq_isrc;
ALTER TABLE bai_hat
ADD CONSTRAINT uq_isrc UNIQUE (isrc);

-- Check for valid royalty percentage
ALTER TABLE album_hop_tac
DROP CONSTRAINT IF EXISTS chk_royalty_percent;
ALTER TABLE album_hop_tac
ADD CONSTRAINT chk_royalty_percent 
CHECK (ty_le_royalty >= 0 AND ty_le_royalty <= 100);

-- ========================================
-- 11. VIEWS FOR COMMON QUERIES
-- ========================================

-- View for catalog listing
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

-- View for statistics
CREATE OR REPLACE VIEW v_catalog_thong_ke AS
SELECT 
    COUNT(*) as tong_so_ban_nhay,
    SUM(CASE WHEN trang_thai = 'da_phat_hanh' THEN 1 ELSE 0 END) as da_phat_hanh,
    SUM(CASE WHEN trang_thai = 'dang_kiem_duyet' THEN 1 ELSE 0 END) as dang_kiem_duyet,
    SUM(CASE WHEN trang_thai = 'ban_nhap' THEN 1 ELSE 0 END) as ban_nhap,
    SUM(CASE WHEN trang_thai = 'tu_choi' THEN 1 ELSE 0 END) as tu_choi
FROM album
WHERE trang_thai != 'da_xoa';

-- ========================================
-- 12. SAMPLE DATA
-- ========================================

-- Sample genres
INSERT INTO the_loai (ten_the_loai, mo_ta) VALUES
('Pop', 'Nhạc pop phổ thông'),
('Rock', 'Nhạc rock mạnh mẽ'),
('Jazz', 'Nhạc jazz tinh tế'),
('Classical', 'Nhạc cổ điển'),
('Hip-Hop', 'Nhạc hip-hop hiện đại'),
('Electronic', 'Nhạc điện tử'),
('R&B', 'Rhythm and Blues'),
('Country', 'Nhạc đồng quê');

-- ========================================
-- 13. INDEX OPTIMIZATION
-- ========================================

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_album_artist_trang_thai ON album(artist_id, trang_thai);
CREATE INDEX IF NOT EXISTS idx_album_loai_ngay ON album(loai_phat_hanh, ngay_phat_hanh);
CREATE INDEX IF NOT EXISTS idx_bai_hat_album_thu_tu ON bai_hat(album_id, thu_tu);
CREATE INDEX IF NOT EXISTS idx_phat_hanh_trang_thai_ngay ON phat_hanh(trang_thai, ngay_phat_hanh_thuc_te);