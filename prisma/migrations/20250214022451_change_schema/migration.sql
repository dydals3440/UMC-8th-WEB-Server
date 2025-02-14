/*
  Warnings:

  - You are about to drop the column `content` on the `LP` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LP" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LP_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LP_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LP" ("authorId", "categoryId", "createdAt", "id", "title", "updatedAt") SELECT "authorId", "categoryId", "createdAt", "id", "title", "updatedAt" FROM "LP";
DROP TABLE "LP";
ALTER TABLE "new_LP" RENAME TO "LP";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
