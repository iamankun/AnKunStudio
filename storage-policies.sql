-- Storage Policies for AnKunStudio bucket

-- 1. Allow authenticated users to upload (INSERT)
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'AnKunStudio');

-- 2. Allow authenticated users to read their own files (SELECT)
CREATE POLICY "Allow authenticated read"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'AnKunStudio');

-- 3. Allow public read access (for viewing images without login)
CREATE POLICY "Allow public read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'AnKunStudio');

-- 4. Allow authenticated users to update their own files
CREATE POLICY "Allow authenticated update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'AnKunStudio');

-- 5. Allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'AnKunStudio');
