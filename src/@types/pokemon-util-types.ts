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
  spriteKey?: string;
  spriteId?: string;
  battleSpriteKey?: string;
  battleSpriteId?: string;
  keys?: string[];
}

export interface PokemonGfxRequestParams {
  type: PokeAssetType;
  back?: boolean;
  forFusion?: boolean;
  startLoad?: boolean;
  variantReq?: boolean;
}

export type PokemonLoadAssetParams = PokemonRenderData & PokemonGfxRequestParams;
