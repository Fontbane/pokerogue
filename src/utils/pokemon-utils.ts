import { allSpecies } from "#data/data-lists";
import type { PokemonSpecies } from "#data/pokemon-species";
import type { SpeciesId } from "#enums/species-id";
import type { PokemonPregenData } from "#types/pokemon-pregen-data";
import { isNullOrUndefined } from "util";
import { randSeedItem } from "./common";

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

export function adjustIvs(ivs: number[], waveIndex: number, pregenData?: PokemonPregenData): number[] {
  const minIv = pregenData?.minIv ?? Math.floor(waveIndex / 10);
  let maxes = pregenData?.guaranteedMaxIvs ?? 0;
  const nonmax: number[] = []; // Holds index of IVs that aren't predefined and rolled below 31
  for (let i = 0; i < 6; i++) {
    if (pregenData?.partialIvs && !isNullOrUndefined(pregenData.partialIvs[i])) {
      // Fill specified partialIvs
      ivs[i] = pregenData.partialIvs[i]!;
    } else {
      ivs[i] = Math.max(ivs[i], minIv);
      if (ivs[i] === 31) {
        maxes--;
      } else {
        nonmax.push(i);
      }
    }
  }
  // If we still need to set some IVs to max, set random remaining nonmax IVs to 31, unless there are none
  while (nonmax.length > 0 && maxes-- > 0) {
    const i = randSeedItem(nonmax);
    ivs[i] = 31;
    nonmax.splice(nonmax.indexOf(i));
  }
  return ivs;
}
