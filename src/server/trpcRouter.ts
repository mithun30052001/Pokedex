import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const t = initTRPC.create();

export const appRouter = t.router({
  getPokemons: t.procedure.query(async () => {
    return await prisma.pokemon.findMany({
      include: { types: true }
    });
  }),

  getPokemon: t.procedure
    .input(z.union([z.string(), z.array(z.string())]))
    .query(async ({ input }) => {
      if (typeof input === 'string') {
        const pokemon = await prisma.pokemon.findUnique({
          where: { name: input },
          include: {
            types: {
              include: {
                type: true,
              },
            },
          },
        });
        if (!pokemon) throw new Error('Pokemon not found');
        return { id: pokemon.id, name: pokemon.name, types: pokemon.types.map(pt => pt.type.name), sprite: pokemon.sprite };
      } else {
        const pokemons = await prisma.pokemon.findMany({
          where: { name: { in: input } },
          include: {
            types: {
              include: {
                type: true,
              },
            },
          },
        });
        return pokemons.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map(pt => pt.type.name),
          sprite: pokemon.sprite,
        }));
      }
    }),

  getPokemonByType: t.procedure.input(z.string()).query(async ({ input }) => {
    const pokemons = await prisma.pokemon.findMany({
      where: {
        types: {
          some: {
            type: {
              name: input,
            },
          },
        },
      },
      include: {
        types: {
          include: {
            type: true,
          },
        },
      },
    });
    return pokemons.map(pokemon => ({
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map(pt => pt.type.name),
      sprite: pokemon.sprite,
    }));
  }),
});

export type AppRouter = typeof appRouter;
