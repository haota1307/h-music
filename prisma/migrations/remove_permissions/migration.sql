-- Remove permission-related tables and fields

-- Drop foreign key constraints first
DROP INDEX IF EXISTS "UserPermission_userId_permissionId_key";
DROP INDEX IF EXISTS "Permission_name_key";

-- Drop tables
DROP TABLE IF EXISTS "UserPermission";
DROP TABLE IF EXISTS "Permission";

-- Remove PermissionType enum if it exists
-- Note: This might need manual cleanup depending on usage 