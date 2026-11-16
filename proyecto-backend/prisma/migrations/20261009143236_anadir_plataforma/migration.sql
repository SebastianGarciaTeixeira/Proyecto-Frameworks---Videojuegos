/*
  Warnings:

  - Added the required column `plataforma` to the `Videojuego` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Videojuego" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "desarrolladora" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL,
    "terminado" BOOLEAN NOT NULL DEFAULT false,
    "publicadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Videojuego" ("desarrolladora", "descripcion", "id", "publicadoEn", "terminado", "titulo") SELECT "desarrolladora", "descripcion", "id", "publicadoEn", "terminado", "titulo" FROM "Videojuego";
DROP TABLE "Videojuego";
ALTER TABLE "new_Videojuego" RENAME TO "Videojuego";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
