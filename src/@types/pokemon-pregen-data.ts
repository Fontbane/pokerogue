import type { Gender } from "#app/data/gender";
import type { PokemonMove } from "#app/data/moves/pokemon-move";
import type { CustomPokemonData } from "#app/data/pokemon/pokemon-data";
import type { Variant } from "#app/sprites/variant";
import type { MoveId } from "#enums/move-id";
import type { Nature } from "#enums/nature";
import type { PartyMemberStrength } from "#enums/party-member-strength";
import type { PokeballType } from "#enums/pokeball";
import type { PokemonType } from "#enums/pokemon-type";
import type { SpeciesId } from "#enums/species-id";
import type { TrainerSlot } from "#enums/trainer-slot";

// This type allows you to very neatly configure an enemy mon. It's then split into PokemonParams and PokemonPregenData for construction.
export type EnemyPokemonCfg = PokemonCfgData & PokemonPregenData;

// This is essentially a partial PokemonData object, omitting fields we shouldn't need, where only species is required
export interface PokemonCfgData {
  species: SpeciesId; // Note: This is a Species, not a PokemonSpecies!
  formIndex?: number;
  gender?: Gender;
  shiny?: boolean;
  variant?: Variant;
  player?: boolean;
  boss?: boolean;
  bossSegments?: number;
  abilityIndex?: number;
  level?: number;
  trainerSlot?: TrainerSlot;
  teraType?: PokemonType;
  ivs?: number[];
  nature?: Nature;
  luck?: number;
  pokerus?: boolean;
  nickname?: string;
  pokeball?: PokeballType;
  moveset?: PokemonMove[]; // This should be used if we want custom PP info on a move, otherwise just use moves

  // Custom and fusion data, seldom used except in MEs
  customPokemonData?: CustomPokemonData;
  fusionSpecies?: SpeciesId;
  fusionFormIndex?: number;
  fusionAbilityIndex?: number;
  fusionShiny?: boolean;
  fusionVariant?: Variant;
  fusionGender?: Gender;
  fusionLuck?: number;
  fusionCustomPokemonData?: CustomPokemonData | null;
  passive?: boolean; // True: Enable on non-boss. False: Disable on boss.
}

// These are arguments for Pokemon generation to use, allowing for more control. Some overlap with PokemonData, but not entirely.
export interface PokemonPregenData {
  shinyLock?: boolean;
  instantTera?: boolean; // Whether the trainer should instantly terastallize this mon
  isPhaseTwo?: boolean;
  strength?: PartyMemberStrength;

  // The remaining fields are not found in PokemonData, and are used as parameters for generation

  // Moveset generation parameters
  moves?: MoveId[]; // Preset moves slotted in before others are generated
  useTeraAsSTAB?: boolean; // Whether a move of the tera type (including Tera Blast) should be generated before STAB
  preferredCoverageType?: PokemonType; // Will try to generate a move of this type after STAB

  // Shiny and HA generation parameters
  shinyRate?: number; // The shiny rate that should be used
  haRate?: number; // The HA rate that should be used
  applyShinyBoosts?: boolean; // Whether to apply shiny boosts from modifiers and events
  applyHABoosts?: boolean; // Whether to apply HA rate boosts from modifiers and events
  shinyRerolls?: number; // How many times to reroll shiny
  haRerolls?: number; // How many times to reroll for HA

  giveEggMove?: boolean;

  // IV generation parameters
  partialIvs?: [hp?: number, attack?: number, defense?: number, spatk?: number, spdef?: number, speed?: number]; // Partial list of set IVs, unfilled entries are generated
  minIv?: number; // The min value for any IV (not applied those already set)
  guaranteedMaxIvs?: number; // The amount of IVs to be guaranteed 31 (including those already set)

  // Misc generation parameters
  preferredGender?: Gender; // Will use this gender for mons with 50/50 gender ratios, otherwise the majority gender is used
  allowEvolution?: boolean; // If set to true, an appropriate species for the given level will be chosen

  // Holds multiple possible natures, form indexes etc. to be chosen from at random during generation
  randomNature?: Nature[];
  randomFormIndex?: number[];
}
