# INTERNATIONAL STANDARD CODES CHO ÂM NHẠC

## 📋 TỔNG QUAN CÁC MÃ QUỐC TẾ

Đã thêm đầy đủ các mã tiêu chuẩn quốc tế vào database schema:

### ✅ ĐÃ CÓ TRONG SCHEMA:

| Mã | Bảng | Mô tả | Độ dài | Bắt buộc |
|----|------|-------|-------|----------|
| **ISRC** | `bai_hat` | International Standard Recording Code | 12 chars | ✅ Bắt buộc |
| **UPC** | `album` | Universal Product Code | 12 chars | ❌ Tùy chọn |
| **ISWC** | `album` | International Standard Musical Work Code | 11 chars | ❌ Tùy chọn |

---

## 🎵 CHI TIẾT CÁC MÃ

### 1. ISRC (International Standard Recording Code)
```sql
-- Trong bảng bai_hat
isrc VARCHAR(12) -- International Standard Recording Code (bắt buộc cho phát hành)
```

- **Mục đích**: Định danh duy nhất cho bản ghi âm
- **Cấu trúc**: CC-XXX-YY-NNN-NN
  - CC: Mã quốc gia (2 ký tự)
  - XXX: Mã đăng ký nghệ sĩ/nhà sản xuất (3 ký tự)
  - YY: Năm sản xuất (2 ký tự)
  - NNN-NN: Số serial (5 ký tự)
- **Ví dụ**: VN-ABC-24-00123
- **Bắt buộc**: Cho tất cả các bản phát hành thương mại

### 2. UPC (Universal Product Code)
```sql
-- Trong bảng album
upc VARCHAR(12) -- Universal Product Code cho album
```

- **Mục đích**: Mã sản phẩm cho album/EP/Single
- **Cấu trúc**: 12 chữ số
- **Ví dụ**: 012345678901
- **Sử dụng**: Cho các cửa hàng vật lý và digital stores
- **Tùy chọn**: Không phải lúc nào cũng cần

### 3. ISWC (International Standard Musical Work Code)
```sql
-- Trong bảng album
iswc VARCHAR(11) -- International Standard Musical Work Code (nếu có)
```

- **Mục đích**: Định danh tác phẩm âm nhạc (bản sáng tác)
- **Cấu trúc**: T-XXXX.XXXXXX.XX
  - T: Prefix cố định
  - XXXX: Mã đăng ký
  - XXXXXX: Số serial
  - XX: Check digit
- **Ví dụ**: T-123.456789.01
- **Tùy chọn**: Chỉ cho các tác phẩm đã đăng ký bản quyền

---

## 🔗 QUAN HỆ GIỮA CÁC MÃ

### ISRC vs ISWC:
- **ISRC**: Cho bản ghi âm (recording) - mỗi version khác nhau có ISRC khác
- **ISWC**: Cho tác phẩm (composition) - cùng bài hát nhưng khác nghệ sĩ vẫn chung ISWC

### Ví dụ thực tế:
```
Bài hát "Shape of You" - Ed Sheeran:
- ISWC: T-900.123.456-0 (tác phẩm gốc)
- ISRC: GB-ABC-17-00123 (bản ghi Ed Sheeran)
- ISRC: US-XYZ-17-00456 (bản ghi cover)
- UPC: 075678612345 (album ÷)
```

---

## 📝 VALIDATION RULES

### ISRC Validation:
```sql
-- Regex pattern cho ISRC
^[A-Z]{2}-[A-Z0-9]{3}-[0-9]{2}-[0-9]{5}$
```

### UPC Validation:
```sql
-- Regex pattern cho UPC
^[0-9]{12}$
```

### ISWC Validation:
```sql
-- Regex pattern cho ISWC
^T-[0-9]{3}\.[0-9]{6}-[0-9]{2}$
```

---

## 🛠️ IMPLEMENTATION NOTES

### 1. Tự động tạo ISRC:
```sql
-- Function để tạo ISRC tự động
DELIMITER $$
CREATE FUNCTION generate_isrc(country_code CHAR(2), artist_code VARCHAR(3), year INT) 
RETURNS VARCHAR(12)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE isrc VARCHAR(12);
    DECLARE serial_num INT;
    
    -- Lấy serial number tiếp theo
    SELECT COALESCE(MAX(CAST(SUBSTRING(isrc, 10, 5) AS UNSIGNED)), 0) + 1
    INTO serial_num
    FROM bai_hat 
    WHERE isrc LIKE CONCAT(country_code, '-', artist_code, '-', RIGHT(year, 2), '-%');
    
    SET isrc = CONCAT(
        country_code, '-', 
        artist_code, '-', 
        RIGHT(year, 2), '-', 
        LPAD(serial_num, 5, '0')
    );
    
    RETURN isrc;
END$$
DELIMITER ;
```

### 2. Check constraint cho ISRC:
```sql
ALTER TABLE bai_hat
ADD CONSTRAINT chk_isrc_format 
CHECK (isrc REGEXP '^[A-Z]{2}-[A-Z0-9]{3}-[0-9]{2}-[0-9]{5}$');
```

### 3. Unique constraint cho ISRC:
```sql
ALTER TABLE bai_hat
ADD CONSTRAINT uq_isrc UNIQUE (isrc);
```

---

## 📊 QUERY VÍ DỤ

### Lấy album với các mã chuẩn:
```sql
SELECT 
    a.ten_album,
    a.upc,
    a.iswc,
    GROUP_CONCAT(
        CONCAT(b.ten_bai_hat, ' (', b.isrc, ')') 
        SEPARATOR '; '
    ) as danh_sach_bai_hat,
    art.name as ten_nghesi
FROM album a
LEFT JOIN bai_hat b ON a.id = b.album_id
JOIN public.artists art ON a.artist_id = art.id
WHERE a.trang_thai = 'da_phat_hanh'
GROUP BY a.id;
```

### Kiểm tra ISRC trùng:
```sql
SELECT isrc, COUNT(*) as so_luong
FROM bai_hat
WHERE isrc IS NOT NULL
GROUP BY isrc
HAVING COUNT(*) > 1;
```

---

## 🎯 BEST PRACTICES

1. **Luôn tạo ISRC** trước khi phát hành
2. **Lưu trữ UPC** cho các sản phẩm bán lẻ
3. **Đăng ký ISWC** cho các tác phẩm gốc
4. **Validation** đầu vào để tránh lỗi
5. **Documentation** rõ ràng cho team production

Hệ thống đã sẵn sàng quản lý đầy đủ các mã tiêu chuẩn quốc tế cho ngành công nghiệp âm nhạc!
