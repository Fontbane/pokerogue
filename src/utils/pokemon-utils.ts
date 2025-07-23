import { hatchableStarters } from "#balance/species-egg-tiers";
import { speciesStarterCosts } from "#balance/starters";
import { allSpecies } from "#data/data-lists";
import type { PokemonSpecies } from "#data/pokemon-species";
import type { SpeciesId } from "#enums/species-id";
import { isBetween } from "./common";

/**
 * Gets the {@linkcode PokemonSpecies} object associated with the {@linkcode SpeciesId} enum given
 * @param species - The {@linkcode SpeciesId} to fetch.
 * If an array of `SpeciesId`s is passed (such as for named trainer spawn pools),
 * one will be selected at random.
 * @returns The associated {@linkcode PokemonSpecies} object
 */
export function getPokemonSpecies(species: SpeciesId | SpeciesId[]): PokemonSpecies {
  if (Array.isArray(species)) {
    // TODO: this RNG roll should not be handled by this function
    species = species[Math.floor(Math.random() * species.length)];
  }
  if (species >= 2000) {
    return allSpecies.find(s => s.speciesId === species)!; // TODO: is this bang correct?
  }
  return allSpecies[species - 1];
}

export function getSpeciesByCost(minCost: number, maxCost?: number): SpeciesId[] {
  if (maxCost) {
    return hatchableStarters.filter(s => isBetween(speciesStarterCosts[s], minCost, maxCost));
  }

  return hatchableStarters.filter(s => speciesStarterCosts[s] === minCost);
}
