import type { SpeciesId } from "#enums/species-id";
import type { Variant } from "#sprites/variant";

export enum PokeAssetType {
  SPRITE,
  ICON,
  ANIMJSON,
  VARIANTJSON,
  FINDVARIANT,
  VARIANTCACHE,
  ALL_GFX,
}

export interface PokemonRenderData {
  species: SpeciesId;
  formIndex?: number;
  female?: boolean;
  shiny?: boolean;
  variant?: Variant;
  formKey?: string;
  variantType?: Variant;
  key?: string;
  comp?: PokemonGfxKey;
  spriteKey?: string;
  spriteId?: string; // 
  fullSpriteKey?: string; // includes back
  fullSpriteId?: string; // 
  baseSpriteKey?: string; // female__gastrodon-east
  variantDataIndex?: string; // gastrodon-east
  atlasPath?: string;
  jsonPath?: string;
  battleSpriteKey?: string; // pkmn__back__shiny__female__gastrodon-east_2
  battleSpriteId?: string; // back__shiny__female__gastrodon-east_2     species spriteId
  keys?: string[];
}

export interface PokemonGfxKey {
  species: string;
  formIndex?: number;
  formKey?: string;
  female?: boolean;
  back?: boolean;
  shiny?: boolean;
  variant?: Variant;
}

export interface PokemonGfxRequestParams {
  type: PokeAssetType;
  back?: boolean;
  forFusion?: boolean;
  startLoad?: boolean;
  variantReq?: boolean;
}

export type PokemonLoadAssetParams = PokemonRenderData & PokemonGfxRequestParams;
