# DATABASE SCHEMA CHO TRANG CATALOG

## Phân tích dữ liệu từ CatalogView.tsx

### Dữ liệu hiện có trong component:
1. **Thống kê (stats)**
   - Tổng số bản nhạc
   - Đã phát hành
   - Đang kiểm duyệt  
   - Bản nháp

2. **Bản phát hành (releases)**
   - ID, Tiêu đề, Nghệ sĩ
   - Loại (Album/Single/EP)
   - Ngày phát hành
   - Trạng thái (Đã phát hành/Đang kiểm duyệt/Bản nháp)
   - Ảnh bìa

3. **Bộ lọc (tabs)**
   - Tất cả, Đã duyệt, Đang chờ, Từ chối

---

## BẢNG DATABASE ĐỀ XUẤT (TIẾNG VIỆT)

### 1. Bảng `nghesi` (Artists)
**LƯU Ý: Bảng này đã tồn tại sẵn với tên `public.artists` - chỉ cần tham chiếu, không tạo mới**

```sql
-- Bảng đã có sẵn trong hệ thống:
-- public.artists (id, name, slug, bio, avatar, etc.)
-- Chỉ cần tham chiếu: nghesi_id -> public.artists.id
```

### 2. Bảng `the_loai` (Genres)
```sql
CREATE TABLE the_loai (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_the_loai VARCHAR(100) NOT NULL,
    mo_ta TEXT,
    trang_thai ENUM('hoat_dong', 'ngung_hoat_dong') DEFAULT 'hoat_dong',
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Bảng `album` (Albums)
```sql
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
    -- International Standard Recording Codes
    upc VARCHAR(12), -- Universal Product Code cho album
    iswc VARCHAR(11), -- International Standard Musical Work Code (nếu có)
    trang_thai ENUM('da_phat_hanh', 'dang_kiem_duyet', 'ban_nhap', 'tu_choi', 'da_xoa') DEFAULT 'ban_nhap',
    ghi_chu TEXT,
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (artist_id) REFERENCES public.artists(id)
);
```

### 4. Bảng `bai_hat` (Tracks)
```sql
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
    FOREIGN KEY (album_id) REFERENCES album(id),
    FOREIGN KEY (artist_id) REFERENCES public.artists(id)
);
```

### 5. Bảng `phat_hanh` (Releases)
```sql
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
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (album_id) REFERENCES album(id)
);
```

### 6. Bảng `thong_ke` (Statistics)
```sql
CREATE TABLE thong_ke (
    id INT PRIMARY KEY AUTO_INCREMENT,
    album_id INT NOT NULL,
    loai_thong_ke ENUM('luot_nghe', 'luot_tai', 'doanh_thu', 'tuong_tac') NOT NULL,
    gia_tri BIGINT NOT NULL,
    ngay_du_lieu DATE NOT NULL,
    nen_tang VARCHAR(100), -- Spotify, Apple Music, etc.
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (album_id) REFERENCES album(id),
    INDEX idx_album_date (album_id, ngay_du_lieu),
    INDEX idx_type_date (loai_thong_ke, ngay_du_lieu)
);
```

### 7. Bảng `artist_album` (Artist-Album Relationship - Many-to-Many)
```sql
CREATE TABLE artist_album (
    id INT PRIMARY KEY AUTO_INCREMENT,
    artist_id INT NOT NULL, -- Tham chiếu đến public.artists.id
    album_id INT NOT NULL,
    vai_tro ENUM('chinh', 'hop_tac', 'sang_tac', 'san_xuat') DEFAULT 'chinh',
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artist_id) REFERENCES public.artists(id),
    FOREIGN KEY (album_id) REFERENCES album(id),
    UNIQUE KEY unique_artist_album (artist_id, album_id, vai_tro)
);
```

---

## MÔ TẢ CÁC TRƯỜNG DỮ LIỆU CHÍNH

### Bảng `album`:
- **ten_album**: Tên album/bản phát hành
- **ma_album**: Mã code để quản lý (ví dụ: ALB2024001)
- **loai_phat_hanh**: Album/Single/EP
- **trang_thai**: Đã phát hành/Đang kiểm duyệt/Bản nháp/Từ chối
- **anh_bia**: URL ảnh bìa
- **the_loai_ids**: JSON chứa danh sách ID thể loại

### Bảng `phat_hanh`:
- **danh_sach_nen_tang**: JSON danh sách nền tảng phân phối
- **trang_thai**: Quản lý workflow kiểm duyệt
- **doanh_so**, **luot_nghe**: Thống kê hiệu quả

### Bảng `thong_ke`:
- Lưu trữ dữ liệu analytics cho dashboard
- Hỗ trợ báo cáo theo ngày/tháng/năm

---

## 📋 PHÂN TÍCH CÁC TÍNH NĂNG CÒN THIẾU TRONG CATALOG

### 🔍 **Từ CatalogView.tsx phân tích:**

#### **1. Features đã có:**
- ✅ Dashboard thống kê (tổng số, đã phát hành, đang kiểm duyệt, bản nháp)
- ✅ Danh sách album table view
- ✅ Bộ lọc theo trạng thái (Tất cả, Đã duyệt, Đang chờ, Từ chối)
- ✅ Actions: Xem thống kê, More options
- ✅ Hiển thị: Tiêu đề, nghệ sĩ, loại, ngày phát hành, trạng thái, ảnh bìa

#### **2. Features CÒN THIẾU:**

##### **🎵 Quản lý Album:**
- ❌ **Edit album** (nút Edit3 trong import nhưng chưa dùng)
- ❌ **Delete/Remove album**
- ❌ **Duplicate album**
- ❌ **Change album status** (workflow transitions)
- ❌ **Bulk actions** (chọn nhiều album cùng lúc)

##### **📊 Statistics & Analytics:**
- ❌ **Detailed statistics modal** (nút BarChart2)
- ❌ **Charts**: Biểu đồ doanh thu, lượt nghe theo thời gian
- ❌ **Platform breakdown**: Thống kê theo từng nền tảng (Spotify, Apple Music)
- ❌ **Geographic data**: Thống kê theo quốc gia/khu vực
- ❌ **Trend analysis**: So sánh hiệu quả giữa các album

##### **🔍 Search & Filter:**
- ❌ **Search bar**: Tìm kiếm theo tên album, nghệ sĩ
- ❌ **Advanced filters**: Lọc theo thể loại, ngày phát hành, nghệ sĩ
- ❌ **Sort options**: Sắp xếp theo ngày, tên, lượt nghe
- ❌ **Date range picker**: Lọc theo khoảng thời gian

##### **📱 UI/UX Features:**
- ❌ **Pagination** cho danh sách dài
- ❌ **Loading states** khi fetch data
- ❌ **Empty states** khi không có dữ liệu
- ❌ **Error handling** khi API thất bại
- ❌ **Responsive design** cho mobile

##### **🎛️ Management Tools:**
- ❌ **Track management**: Xem/chỉnh sửa danh sách bài hát trong album
- ❌ **Release scheduling**: Lên lịch phát hành
- ❌ **Distribution management**: Quản lý nền tảng phân phối
- ❌ **Metadata editing**: Sửa thông tin ISRC, copyright, etc.

##### **🔐 Permissions & Access:**
- ❌ **Role-based access**: Artist vs Admin permissions
- ❌ **Collaborator management**: Thêm người hợp tác
- ❌ **Approval workflow**: Multi-step approval process

---

## 🗄️ BẢNG DATABASE CẦN THIẾT CHO CATALOG (TIẾNG VIỆT)

### 8. Bảng `album_hop_tac` (Album Collaborators)
```sql
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
    FOREIGN KEY (album_id) REFERENCES album(id),
    FOREIGN KEY (artist_id) REFERENCES public.artists(id),
    UNIQUE KEY unique_album_artist_role (album_id, artist_id, vai_tro)
);
```

### 9. Bảng `album_lich_su` (Album History/Audit Log)
```sql
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
    FOREIGN KEY (album_id) REFERENCES album(id),
    INDEX idx_album_action (album_id, hanh_dong),
    INDEX idx_date_action (ngay_tao, hanh_dong)
);
```

### 10. Bảng `album_tag` (Album Tags/Labels)
```sql
CREATE TABLE album_tag (
    id INT PRIMARY KEY AUTO_INCREMENT,
    album_id INT NOT NULL,
    ten_tag VARCHAR(50) NOT NULL,
    loai_tag ENUM('the_loai', 'nhan_hieu', 'campaign', 'season') NOT NULL,
    trang_thai ENUM('hoat_dong', 'ngung_hoat_dong') DEFAULT 'hoat_dong',
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (album_id) REFERENCES album(id),
    UNIQUE KEY unique_album_tag (album_id, ten_tag),
    INDEX idx_tag_type (loai_tag, ten_tag)
);
```

---

## 🔄 CẬP NHẬT BẢNG HIỆN CÓ

### Bảng `album` - Thêm các trường:
```sql
ALTER TABLE album 
ADD COLUMN tu_khoa TEXT, -- SEO keywords
ADD COLUMN mo_ta_ngan VARCHAR(500), -- Short description
ADD COLUMN ngon_ngu ENUM('vi', 'en') DEFAULT 'vi',
ADD COLUMN trang_chu BOOLEAN DEFAULT FALSE, -- Featured on homepage
ADD COLUMN trang_thai_index ENUM('can_index', 'da_index', 'khong_index') DEFAULT 'can_index';
```

### Bảng `phat_hanh` - Thêm các trường:
```sql
ALTER TABLE phat_hanh 
ADD COLUMN khu_vuc_phat_hanh JSON, -- ['VN', 'US', 'Global']
ADD COLUMN ngay_tu_choi DATE,
ADD COLUMN ly_do_thu_hoi TEXT,
ADD COLUMN so_luong_nen_tang INT DEFAULT 0; -- Số lượng nền tảng đã phát hành
```

### Lấy danh sách album với thông tin nghệ sĩ:
```sql
SELECT 
    a.id, a.ten_album, a.loai_phat_hanh, a.ngay_phat_hanh, a.trang_thai, a.anh_bia,
    art.name as ten_nghesi, -- Tham chiếu đến public.artists.name
    art.slug,
    ph.trang_thai as trang_thai_phat_hanh
FROM album a
JOIN public.artists art ON a.artist_id = art.id -- Tham chiếu đến bảng có sẵn
LEFT JOIN phat_hanh ph ON a.id = ph.album_id
WHERE a.trang_thai != 'da_xoa'
ORDER BY a.ngay_tao DESC;
```

### Thống kê theo trạng thái:
```sql
SELECT 
    trang_thai,
    COUNT(*) as so_luong
FROM album
GROUP BY trang_thai;
```

### Lấy thống kê tổng quan:
```sql
SELECT 
    COUNT(*) as tong_so_ban_nhay,
    SUM(CASE WHEN trang_thai = 'da_phat_hanh' THEN 1 ELSE 0 END) as da_phat_hanh,
    SUM(CASE WHEN trang_thai = 'dang_kiem_duyet' THEN 1 ELSE 0 END) as dang_kiem_duyet,
    SUM(CASE WHEN trang_thai = 'ban_nhap' THEN 1 ELSE 0 END) as ban_nhap
FROM album
WHERE trang_thai != 'da_xoa';
```
