-- ========================================
-- DATABASE DROP SCRIPT FOR CATALOG
-- ========================================
-- Purpose: Clean up all catalog tables
-- Use with caution: This will delete all data!

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- Drop views first
DROP VIEW IF EXISTS v_catalog_danh_sach;
DROP VIEW IF EXISTS v_catalog_thong_ke;

-- Drop triggers
DROP TRIGGER IF EXISTS tr_album_lich_su_update;
DROP TRIGGER IF EXISTS tr_album_lich_su_insert;

-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS album_tag;
DROP TABLE IF EXISTS album_lich_su;
DROP TABLE IF EXISTS album_hop_tac;
DROP TABLE IF EXISTS artist_album;
DROP TABLE IF EXISTS thong_ke;
DROP TABLE IF EXISTS phat_hanh;
DROP TABLE IF EXISTS bai_hat;
DROP TABLE IF EXISTS album;
DROP TABLE IF EXISTS the_loai;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- ========================================
-- COMPLETION MESSAGE
-- ========================================
-- All catalog tables have been dropped successfully!
-- Total tables dropped: 9
-- Views dropped: 2
-- Triggers dropped: 2
