import { globalScene } from "#app/global-scene";
import { Gender } from "#data/gender";
import { SpeciesId } from "#enums/species-id";
import type { Pokemon } from "#field/pokemon";
import { hasExpSprite } from "#sprites/sprite-utils";
import type { Variant, VariantSet } from "#sprites/variant";
import { variantColorCache, variantData } from "#sprites/variant";

// Regex patterns

/** Regex matching double underscores */
const DUNDER_REGEX = /_{2}/g;

export function hasFemaleIcon(species: SpeciesId, tier = 0): boolean {
  const femaleIcons = [
    [
      // Species where BASE has female icons
      SpeciesId.DODUO,
      SpeciesId.DODRIO,
      SpeciesId.HIPPOPOTAS,
      SpeciesId.HIPPOWDON,
      SpeciesId.UNFEZANT,
      SpeciesId.FRILLISH,
      SpeciesId.JELLICENT,
      SpeciesId.PYROAR,
    ],
    [
      // Species where T1 SHINY has female icons
      SpeciesId.DODUO,
      SpeciesId.DODRIO,
      SpeciesId.HIPPOPOTAS,
      SpeciesId.HIPPOWDON,
      SpeciesId.UNFEZANT,
      SpeciesId.FRILLISH,
      SpeciesId.JELLICENT,
      SpeciesId.PYROAR,
    ],
    [
      // Species where T2 SHINY has female icons
      SpeciesId.DODUO,
      SpeciesId.DODRIO,
      SpeciesId.MEGANIUM,
      SpeciesId.TORCHIC,
      SpeciesId.COMBUSKEN,
      SpeciesId.BLAZIKEN,
      SpeciesId.HIPPOPOTAS,
      SpeciesId.HIPPOWDON,
      SpeciesId.UNFEZANT,
      SpeciesId.FRILLISH,
      SpeciesId.JELLICENT,
      SpeciesId.PYROAR,
    ],
    [
      // Species where T3 SHINY has female icons
      SpeciesId.DODUO,
      SpeciesId.DODRIO,
      SpeciesId.MEGANIUM,
      SpeciesId.TORCHIC,
      SpeciesId.COMBUSKEN,
      SpeciesId.BLAZIKEN,
      SpeciesId.HIPPOPOTAS,
      SpeciesId.HIPPOWDON,
      SpeciesId.UNFEZANT,
      SpeciesId.FRILLISH,
      SpeciesId.JELLICENT,
      SpeciesId.PYROAR,
    ],
  ];
  return femaleIcons[tier].includes(species);
}

/**
 * Calculate the sprite ID from a pokemon form.
 */
export function getSpriteId(pokemon: Pokemon, ignoreOverride?: boolean): string {
  return pokemon
    .getSpeciesForm(ignoreOverride)
    .getSpriteId(
      pokemon.getGender(ignoreOverride) === Gender.FEMALE,
      pokemon.formIndex,
      pokemon.shiny,
      pokemon.variant,
    );
}

export function getBattleSpriteId(pokemon: Pokemon, back?: boolean, ignoreOverride = false): string {
  if (back === undefined) {
    back = pokemon.isPlayer();
  }
  return pokemon
    .getSpeciesForm(ignoreOverride)
    .getSpriteId(
      pokemon.getGender(ignoreOverride) === Gender.FEMALE,
      pokemon.formIndex,
      pokemon.shiny,
      pokemon.variant,
      back,
    );
}

/** Compute the path to the sprite atlas by converting double underscores to path components (/)
 */
export function getSpriteAtlasPath(pokemon: Pokemon, ignoreOverride = false): string {
  const spriteId = getSpriteId(pokemon, ignoreOverride).replace(DUNDER_REGEX, "/");
  return `${/_[1-3]$/.test(spriteId) ? "variant/" : ""}${spriteId}`;
}

/**
 * Load the variant assets for the given sprite and store it in {@linkcode variantColorCache}.
 * @param spriteKey - The key of the sprite to load
 * @param fileRoot - The root path of the sprite file
 * @param variant - The variant to load
 * @param scene - The scene to load the assets in (defaults to the global scene)
 */
export async function loadPokemonVariantAssets(spriteKey: string, fileRoot: string, variant: Variant): Promise<void> {
  if (variantColorCache.hasOwnProperty(spriteKey)) {
    return;
  }
  const useExpSprite = globalScene.experimentalSprites && hasExpSprite(spriteKey);
  if (useExpSprite) {
    fileRoot = `exp/${fileRoot}`;
  }
  let variantConfig = variantData;
  fileRoot.split("/").map(p => (variantConfig ? (variantConfig = variantConfig[p]) : null));
  const variantSet = variantConfig as VariantSet;
  if (!variantConfig || variantSet[variant] !== 1) {
    return;
  }
  variantColorCache[spriteKey] = await globalScene
    .cachedFetch(`./images/pokemon/variant/${fileRoot}.json`)
    .then(res => res.json());
}
