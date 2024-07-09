import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const types = ["grass", "fire"];

  for (const type of types) {
    await prisma.type.upsert({
      where: { name: type },
      update: {},
      create: { name: type },
    });
  }
  
  const pokemons = [
    {
      name: "Bulbasaur",
      sprite: "https://pokemon.com/pictures/bulbasaur.png",
      types: ["grass"],
    },
    {
      name: "Charmander",
      sprite: "https://pokemon.com/pictures/charmander.png",
      types: ["fire"],
    },
  ];

  for (const pokemon of pokemons) {
    const createdPokemon = await prisma.pokemon.create({
      data: {
        name: pokemon.name,
        sprite: pokemon.sprite,
      },
    });

    for (const type of pokemon.types) {
      const typeRecord = await prisma.type.findUnique({
        where: { name: type },
      });

      if (typeRecord) {
        await prisma.pokemonType.create({
          data: {
            pokemonId: createdPokemon.id,
            typeId: typeRecord.id,
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
