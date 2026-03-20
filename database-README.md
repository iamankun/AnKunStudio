# 📀 DATABASE CATALOG SYSTEM

## 📋 Tổng quan

Hệ thống database cho trang quản lý catalog âm nhạc, được thiết kế để quản lý album, bài hát, nghệ sĩ và quy trình phát hành.

## 🗄️ Cấu trúc Database

### Bảng chính (9 bảng)

| Bảng | Mục đích | Key fields |
|------|----------|------------|
| **the_loai** | Quản lý thể loại nhạc | ten_the_loai, trang_thai |
| **album** | Album/Single/EP | ten_album, artist_id, ISRC/UPC/ISWC |
| **bai_hat** | Tracks trong album | ten_bai_hat, album_id, ISRC |
| **phat_hanh** | Quản lý phát hành | trang_thai, ngay_phat_hanh |
| **thong_ke** | Statistics cơ bản | loai_thong_ke, gia_tri |
| **artist_album** | Many-to-many | vai_tro (chinh/hop_tac) |
| **album_hop_tac** | Collaborators | vai_tro, ty_le_royalty |
| **album_lich_su** | Audit log | hanh_dong, gia_tri_cu/moi |
| **album_tag** | Tags/Labels | ten_tag, loai_tag |

### Views (2 views)

| View | Mục đích | Query |
|------|----------|-------|
| **v_catalog_danh_sach** | Catalog listing | JOIN album + artists |
| **v_catalog_thong_ke** | Dashboard stats | COUNT theo trạng thái |

## 🔧 Installation

### 1. Tạo database:
```bash
mysql -u root -p < database-create.sql
```

### 2. Xóa database (nếu cần):
```bash
mysql -u root -p < database-drop.sql
```

## 🎵 Features

### ✅ Đã implement:
- **ISRC/UPC/ISWC codes** cho ngành công nghiệp âm nhạc
- **Audit trail** với `album_lich_su`
- **Collaboration management** với `album_hop_tac`
- **Flexible tagging** với `album_tag`
- **Workflow states** (ban_nhap → dang_kiem_duyet → da_phat_hanh)
- **Multi-language support** (vi/en)
- **SEO optimization** (keywords, meta descriptions)

### 🔗 Integration:
- **public.artists** table (tham chiếu)
- **JSON fields** cho flexible data
- **Triggers** cho automatic audit logging

## 📊 Query Examples

### Lấy danh sách catalog:
```sql
SELECT * FROM v_catalog_danh_sach
WHERE trang_thai = 'da_phat_hanh'
ORDER BY ngay_phat_hanh DESC;
```

### Thống kê dashboard:
```sql
SELECT * FROM v_catalog_thong_ke;
```

### Tìm kiếm album:
```sql
SELECT a.*, art.name as ten_nghesi
FROM album a
JOIN public.artists art ON a.artist_id = art.id
WHERE a.ten_album LIKE '%keyword%'
   OR art.name LIKE '%keyword%';
```

### Lấy tracks trong album:
```sql
SELECT * FROM bai_hat
WHERE album_id = ?
ORDER BY thu_tu;
```

## 🎯 Validation Rules

### ISRC Format: `CC-XXX-YY-NNN-NN`
- CC: Country code (2 chars)
- XXX: Registrant code (3 chars)
- YY: Year (2 chars)
- NNN-NN: Serial number (5 chars)

### UPC Format: 12 digits
- Ví dụ: `012345678901`

### ISWC Format: `T-XXXX.XXXXXX.XX`
- Ví dụ: `T-123.456789.01`

## 🔄 Workflow States

```
ban_nhap → dang_kiem_duyet → da_phat_hanh
    ↓             ↓              ↓
  tu_choi      tu_choi        thu_hoi
```

## 📝 Data Types

### JSON Fields:
- `album.the_loai_ids`: `[1, 2, 3]`
- `album.tu_khoa`: `["pop", "vietnamese", "2024"]`
- `phat_hanh.danh_sach_nen_tang`: `["spotify", "apple_music"]`
- `album_lich_su.gia_tri_cu/moi`: Full object snapshot

### ENUM Types:
- `album.loai_phat_hanh`: album, single, ep
- `album.trang_thai`: da_phat_hanh, dang_kiem_duyet, ban_nhap, tu_choi, da_xoa
- `bai_hat.trang_thai`: hoan_thanh, dang_lam, da_xoa
- `phat_hanh.trang_thai`: da_phat_hanh, dang_kiem_duyet, cho_phat_hanh, tu_choi, thu_hoi

## 🚀 Performance

### Indexes:
- Primary keys trên tất cả tables
- Foreign key indexes
- Composite indexes cho common queries
- Unique constraints cho business rules

### Optimized Queries:
- Views cho complex joins
- Composite indexes cho filters
- Proper data types cho storage

## 🔒 Security

### Audit Trail:
- Tự động log changes qua triggers
- Track user actions, IP, timestamp
- Before/after values trong JSON

### Constraints:
- Format validation cho ISRC/UPC/ISWC
- Royalty percentage limits (0-100%)
- Unique constraints cho business rules

## 📱 Frontend Integration

### API Endpoints cần thiết:
- `GET /catalog` - Danh sách album (dùng `v_catalog_danh_sach`)
- `GET /catalog/stats` - Dashboard stats (dùng `v_catalog_thong_ke`)
- `GET /catalog/:id` - Album details
- `POST /catalog` - Tạo album mới
- `PUT /catalog/:id` - Update album
- `DELETE /catalog/:id` - Xóa album

### Component mapping:
| Component | Data source |
|-----------|-------------|
| **CatalogView** | `v_catalog_danh_sach` + `v_catalog_thong_ke` |
| **ReleaseInfoView** | `album` table |
| **TracklistView** | `bai_hat` table |
| **DistributionView** | `phat_hanh` table |

## 🛠️ Maintenance

### Backup:
```bash
mysqldump -u root -p database_name > backup.sql
```

### Health Check:
```sql
-- Check table sizes
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.tables 
WHERE table_schema = 'database_name'
ORDER BY (data_length + index_length) DESC;

-- Check for duplicate ISRC
SELECT isrc, COUNT(*) as count
FROM bai_hat
WHERE isrc IS NOT NULL
GROUP BY isrc
HAVING COUNT(*) > 1;
```

## 📞 Support

### Common Issues:
1. **ISRC duplicates**: Check constraints và validation
2. **Foreign key errors**: Verify `public.artists` exists
3. **JSON format errors**: Use proper JSON syntax
4. **Performance issues**: Check indexes và query optimization

### Debug Queries:
```sql
-- Check album with missing artists
SELECT a.id, a.ten_album, a.artist_id
FROM album a
LEFT JOIN public.artists art ON a.artist_id = art.id
WHERE art.id IS NULL;

-- Check albums without tracks
SELECT a.id, a.ten_album
FROM album a
LEFT JOIN bai_hat b ON a.id = b.album_id
WHERE b.id IS NULL AND a.trang_thai != 'da_xoa';
```

---

## 📄 Files

- `database-create.sql` - Full database creation script
- `database-drop.sql` - Clean up script
- `database-schema.md` - Detailed schema documentation
- `database-codes.md` - ISRC/UPC/ISWC codes guide
- `database-README.md` - This file

**Ready for production deployment! 🚀**
