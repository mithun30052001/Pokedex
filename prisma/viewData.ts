import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pokemons = await prisma.pokemon.findMany({
    include: {
      types: {
        include: {
          type: true,
        },
      },
    },
  });

  pokemons.forEach(pokemon => {
    const types = pokemon.types.map(pt => pt.type.name).join(", ");
    console.log(`Name: ${pokemon.name}, Types: ${types}, Sprite: ${pokemon.sprite}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
