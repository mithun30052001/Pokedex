-- CreateIndex
CREATE INDEX "PokemonType_pokemonId_idx" ON "PokemonType"("pokemonId");

-- CreateIndex
CREATE INDEX "PokemonType_typeId_idx" ON "PokemonType"("typeId");

-- CreateIndex
CREATE INDEX "pokemon_type_index" ON "PokemonType"("pokemonId", "typeId");
