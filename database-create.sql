-- ========================================
-- DATABASE CREATION SCRIPT FOR CATALOG
-- ========================================
-- Created: 2026-03-20
-- Purpose: Music catalog management system
-- Compatible with: public.artists table

-- ========================================
-- 1. BẢNG THE_LOAI (GENRES)
-- ========================================
CREATE TABLE the_loai (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_the_loai VARCHAR(100) NOT NULL,
    mo_ta TEXT,
    trang_thai ENUM('hoat_dong', 'ngung_hoat_dong') DEFAULT 'hoat_dong',
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ten_the_loai (ten_the_loai),
    INDEX idx_trang_thai (trang_thai)
);

-- ========================================
-- 2. BẢNG ALBUM (ALBUMS/SINGLES/EP)
-- ========================================
CREATE TABLE album (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_album VARCHAR(255) NOT NULL,
    ma_album VARCHAR(50) UNIQUE NOT NULL,
    artist_id INT NOT NULL, -- Tham chiếu đến public.artists.id
    loai_phat_hanh ENUM('album', 'single', 'ep') NOT NULL,
    mo_ta TEXT,
    anh_bia VARCHAR(500),
    ngay_phat_hanh DATE,
    nha_phan_phoi VARCHAR(255),
    the_loai_ids JSON,
    -- International Standard Codes
    upc VARCHAR(12), -- Universal Product Code cho album
    iswc VARCHAR(11), -- International Standard Musical Work Code
    -- Metadata bổ sung
    tu_khoa TEXT, -- SEO keywords
    mo_ta_ngan VARCHAR(500), -- Short description
    ngon_ngu ENUM('vi', 'en') DEFAULT 'vi',
    trang_chu BOOLEAN DEFAULT FALSE, -- Featured on homepage
    trang_thai_index ENUM('can_index', 'da_index', 'khong_index') DEFAULT 'can_index',
    -- Workflow states
    trang_thai ENUM('da_phat_hanh', 'dang_kiem_duyet', 'ban_nhap', 'tu_choi', 'da_xoa') DEFAULT 'ban_nhap',
    ghi_chu TEXT,
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (artist_id) REFERENCES public.artists(id),
    
    -- Indexes
    INDEX idx_ma_album (ma_album),
    INDEX idx_artist_id (artist_id),
    INDEX idx_trang_thai (trang_thai),
    INDEX idx_ngay_phat_hanh (ngay_phat_hanh),
    INDEX idx_loai_phat_hanh (loai_phat_hanh),
    INDEX idx_trang_chu (trang_chu)
);

-- ========================================
-- 3. BẢNG BAI_HAT (TRACKS)
-- ========================================
CREATE TABLE bai_hat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_bai_hat VARCHAR(255) NOT NULL,
    ma_bai_hat VARCHAR(50) UNIQUE,
    album_id INT,
    artist_id INT NOT NULL, -- Tham chiếu đến public.artists.id
    thu_tu INT,
    thoi_luong TIME,
    file_mp3 VARCHAR(500),
    isrc VARCHAR(12), -- International Standard Recording Code (bắt buộc cho phát hành)
    lyric TEXT,
    the_loai_ids JSON,
    trang_thai ENUM('hoan_thanh', 'dang_lam', 'da_xoa') DEFAULT 'dang_lam',
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (album_id) REFERENCES album(id) ON DELETE SET NULL,
    FOREIGN KEY (artist_id) REFERENCES public.artists(id),
    
    -- Indexes
    INDEX idx_ma_bai_hat (ma_bai_hat),
    INDEX idx_album_id (album_id),
    INDEX idx_artist_id (artist_id),
    INDEX idx_isrc (isrc),
    INDEX idx_thu_tu (album_id, thu_tu),
    INDEX idx_trang_thai (trang_thai)
);

-- ========================================
-- 4. BẢNG PHAT_HANH (RELEASES)
-- ========================================
CREATE TABLE phat_hanh (
    id INT PRIMARY KEY AUTO_INCREMENT,
    album_id INT NOT NULL,
    ma_phat_hanh VARCHAR(50) UNIQUE NOT NULL,
    ngay_phat_hanh_du_kien DATE,
    ngay_phat_hanh_thuc_te DATE,
    nha_phan_phoi VARCHAR(255),
    danh_sach_nen_tang JSON, -- Spotify, Apple Music, etc.
    trang_thai ENUM('da_phat_hanh', 'dang_kiem_duyet', 'cho_phat_hanh', 'tu_choi', 'thu_hoi') DEFAULT 'dang_kiem_duyet',
    ly_do_tu_choi TEXT,
    doanh_so DECIMAL(15,2) DEFAULT 0,
    luot_nghe BIGINT DEFAULT 0,
    -- Fields bổ sung
    khu_vuc_phat_hanh JSON, -- ['VN', 'US', 'Global']
    ngay_tu_choi DATE,
    ly_do_thu_hoi TEXT,
    so_luong_nen_tang INT DEFAULT 0, -- Số lượng nền tảng đã phát hành
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (album_id) REFERENCES album(id),
    
    -- Indexes
    INDEX idx_ma_phat_hanh (ma_phat_hanh),
    INDEX idx_album_id (album_id),
    INDEX idx_trang_thai (trang_thai),
    INDEX idx_ngay_phat_hanh (ngay_phat_hanh_thuc_te),
    INDEX idx_nha_phan_phoi (nha_phan_phoi)
);

-- ========================================
-- 5. BẢNG THONG_KE (STATISTICS)
-- ========================================
CREATE TABLE thong_ke (
    id INT PRIMARY KEY AUTO_INCREMENT,
    album_id INT NOT NULL,
    loai_thong_ke ENUM('luot_nghe', 'luot_tai', 'doanh_thu', 'tuong_tac') NOT NULL,
    gia_tri BIGINT NOT NULL,
    ngay_du_lieu DATE NOT NULL,
    nen_tang VARCHAR(100), -- Spotify, Apple Music, etc.
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (album_id) REFERENCES album(id),
    
    -- Indexes
    INDEX idx_album_date (album_id, ngay_du_lieu),
    INDEX idx_type_date (loai_thong_ke, ngay_du_lieu),
    INDEX idx_nen_tang (nen_tang)
);

-- ========================================
-- 6. BẢNG ARTIST_ALBUM (MANY-TO-MANY RELATIONSHIP)
-- ========================================
CREATE TABLE artist_album (
    id INT PRIMARY KEY AUTO_INCREMENT,
    artist_id INT NOT NULL, -- Tham chiếu đến public.artists.id
    album_id INT NOT NULL,
    vai_tro ENUM('chinh', 'hop_tac', 'sang_tac', 'san_xuat') DEFAULT 'chinh',
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (artist_id) REFERENCES public.artists(id),
    FOREIGN KEY (album_id) REFERENCES album(id),
    
    -- Unique constraint
    UNIQUE KEY unique_artist_album (artist_id, album_id, vai_tro),
    
    -- Indexes
    INDEX idx_artist_id (artist_id),
    INDEX idx_album_id (album_id),
    INDEX idx_vai_tro (vai_tro)
);

-- ========================================
-- 7. BẢNG ALBUM_HOP_TAC (ALBUM COLLABORATORS)
-- ========================================
CREATE TABLE album_hop_tac (
    id INT PRIMARY KEY AUTO_INCREMENT,
    album_id INT NOT NULL,
    artist_id INT NOT NULL, -- Tham chiếu public.artists
    vai_tro ENUM('primary_artist', 'featured_artist', 'producer', 'songwriter', 'composer', 'engineer') NOT NULL,
    ty_le_royalty DECIMAL(5,2) DEFAULT 0.00,
    trang_thai ENUM('da_moi', 'da_chap_nhan', 'tu_choi') DEFAULT 'da_moi',
    ngay_moi DATE,
    ngay_chap_nhan DATE,
    ghi_chu TEXT,
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (album_id) REFERENCES album(id),
    FOREIGN KEY (artist_id) REFERENCES public.artists(id),
    
    -- Unique constraint
    UNIQUE KEY unique_album_artist_role (album_id, artist_id, vai_tro),
    
    -- Indexes
    INDEX idx_album_id (album_id),
    INDEX idx_artist_id (artist_id),
    INDEX idx_vai_tro (vai_tro),
    INDEX idx_trang_thai (trang_thai)
);

-- ========================================
-- 8. BẢNG ALBUM_LICH_SU (AUDIT LOG)
-- ========================================
CREATE TABLE album_lich_su (
    id INT PRIMARY KEY AUTO_INCREMENT,
    album_id INT NOT NULL,
    hanh_dong ENUM('tao_moi', 'cap_nhat', 'doi_trang_thai', 'xoa', 'phat_hanh') NOT NULL,
    gia_tri_cu JSON, -- Dữ liệu trước khi thay đổi
    gia_tri_moi JSON, -- Dữ liệu sau khi thay đổi
    nguoi_thuc_hien INT, -- User ID thực hiện hành động
    ip_address VARCHAR(45),
    user_agent TEXT,
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (album_id) REFERENCES album(id),
    
    -- Indexes
    INDEX idx_album_action (album_id, hanh_dong),
    INDEX idx_date_action (ngay_tao, hanh_dong),
    INDEX idx_nguoi_thuc_hien (nguoi_thuc_hien)
);

-- ========================================
-- 9. BẢNG ALBUM_TAG (ALBUM TAGS/LABELS)
-- ========================================
CREATE TABLE album_tag (
    id INT PRIMARY KEY AUTO_INCREMENT,
    album_id INT NOT NULL,
    ten_tag VARCHAR(50) NOT NULL,
    loai_tag ENUM('the_loai', 'nhan_hieu', 'campaign', 'season') NOT NULL,
    trang_thai ENUM('hoat_dong', 'ngung_hoat_dong') DEFAULT 'hoat_dong',
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign keys
    FOREIGN KEY (album_id) REFERENCES album(id),
    
    -- Unique constraint
    UNIQUE KEY unique_album_tag (album_id, ten_tag),
    
    -- Indexes
    INDEX idx_album_id (album_id),
    INDEX idx_ten_tag (ten_tag),
    INDEX idx_loai_tag (loai_tag),
    INDEX idx_tag_type (loai_tag, ten_tag)
);

-- ========================================
-- 10. CONSTRAINTS & VALIDATIONS
-- ========================================

-- ISRC format validation
ALTER TABLE bai_hat
ADD CONSTRAINT chk_isrc_format 
CHECK (isrc IS NULL OR isrc REGEXP '^[A-Z]{2}-[A-Z0-9]{3}-[0-9]{2}-[0-9]{5}$');

-- UPC format validation
ALTER TABLE album
ADD CONSTRAINT chk_upc_format 
CHECK (upc IS NULL OR upc REGEXP '^[0-9]{12}$');

-- ISWC format validation
ALTER TABLE album
ADD CONSTRAINT chk_iswc_format 
CHECK (iswc IS NULL OR iswc REGEXP '^[A-Z]-[0-9]{3}\\.[0-9]{6}\\.[0-9]{2}$');

-- Unique ISRC constraint
ALTER TABLE bai_hat
ADD CONSTRAINT uq_isrc UNIQUE (isrc);

-- Check for valid royalty percentage
ALTER TABLE album_hop_tac
ADD CONSTRAINT chk_royalty_percent 
CHECK (ty_le_royalty >= 0 AND ty_le_royalty <= 100);

-- ========================================
-- 11. TRIGGERS FOR AUDIT LOG
-- ========================================

DELIMITER $$

-- Trigger for album changes
CREATE TRIGGER tr_album_lich_su_update
AFTER UPDATE ON album
FOR EACH ROW
BEGIN
    IF OLD.trang_thai != NEW.trang_thai OR OLD.ten_album != NEW.ten_album THEN
        INSERT INTO album_lich_su (album_id, hanh_dong, gia_tri_cu, gia_tri_moi, ngay_tao)
        VALUES (
            NEW.id,
            'cap_nhat',
            JSON_OBJECT(
                'trang_thai', OLD.trang_thai,
                'ten_album', OLD.ten_album,
                'ngay_cap_nhat', OLD.ngay_cap_nhat
            ),
            JSON_OBJECT(
                'trang_thai', NEW.trang_thai,
                'ten_album', NEW.ten_album,
                'ngay_cap_nhat', NEW.ngay_cap_nhat
            ),
            NOW()
        );
    END IF;
END$$

-- Trigger for album creation
CREATE TRIGGER tr_album_lich_su_insert
AFTER INSERT ON album
FOR EACH ROW
BEGIN
    INSERT INTO album_lich_su (album_id, hanh_dong, gia_tri_moi, ngay_tao)
    VALUES (
        NEW.id,
        'tao_moi',
        JSON_OBJECT(
            'ten_album', NEW.ten_album,
            'artist_id', NEW.artist_id,
            'trang_thai', NEW.trang_thai
        ),
        NOW()
    );
END$$

DELIMITER ;

-- ========================================
-- 12. VIEWS FOR COMMON QUERIES
-- ========================================

-- View for catalog listing
CREATE VIEW v_catalog_danh_sach AS
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
CREATE VIEW v_catalog_thong_ke AS
SELECT 
    COUNT(*) as tong_so_ban_nhay,
    SUM(CASE WHEN trang_thai = 'da_phat_hanh' THEN 1 ELSE 0 END) as da_phat_hanh,
    SUM(CASE WHEN trang_thai = 'dang_kiem_duyet' THEN 1 ELSE 0 END) as dang_kiem_duyet,
    SUM(CASE WHEN trang_thai = 'ban_nhap' THEN 1 ELSE 0 END) as ban_nhap,
    SUM(CASE WHEN trang_thai = 'tu_choi' THEN 1 ELSE 0 END) as tu_choi
FROM album
WHERE trang_thai != 'da_xoa';

-- ========================================
-- 13. SAMPLE DATA (OPTIONAL)
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
-- 14. INDEX OPTIMIZATION
-- ========================================

-- Composite indexes for common queries
CREATE INDEX idx_album_artist_trang_thai ON album(artist_id, trang_thai);
CREATE INDEX idx_album_loai_ngay ON album(loai_phat_hanh, ngay_phat_hanh);
CREATE INDEX idx_bai_hat_album_thu_tu ON bai_hat(album_id, thu_tu);
CREATE INDEX idx_phat_hanh_trang_thai_ngay ON phat_hanh(trang_thai, ngay_phat_hanh_thuc_te);

-- ========================================
-- COMPLETION MESSAGE
-- ========================================
-- Database creation completed successfully!
-- Total tables: 9 main tables + 2 views
-- Features: ISRC/UPC/ISWC support, audit log, collaboration management
-- Compatible with: public.artists table
