-- CreateTable
CREATE TABLE "Videojuego" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "desarrolladora" TEXT NOT NULL,
    "terminado" BOOLEAN NOT NULL DEFAULT false,
    "publicadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
