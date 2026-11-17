import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();
 
async function main() {
  await prisma.tarea.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      titulo: "Videojuego de ejemplo",
      descripcion: "Creada por la semilla al arrancar",
      completada: false,
    },
  });
}
 
main().finally(() => prisma.$disconnect());
