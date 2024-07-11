import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.pokemonType.deleteMany({});
  await prisma.pokemon.deleteMany({});
  await prisma.type.deleteMany({});

  const types = ["grass", "fire", "water","electric","bug","poison"];

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
      sprite: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png",
      types: ["grass"],
    },
    {
      name: "Charmander",
      sprite: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/003.png",
      types: ["fire"],
    },
    {
      name: "Squirtle",
      sprite: "https://img.pokemondb.net/artwork/avif/squirtle.avif",
      types: ["water"]
    },
    {
      name: "Pikachu",
      sprite: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png",
      types: ["fire","electric"]
    }
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
