import "vitest-canvas-mock";

import { initLoggedInUser } from "#app/account";
import { initAbilities } from "#app/data/ability";
import { initBiomes } from "#app/data/biomes";
import { initEggMoves } from "#app/data/balance/egg-moves";
import { initMoves } from "#app/data/move";
import { initPokemonPrevolutions } from "#app/data/balance/pokemon-evolutions";
import { initPokemonForms } from "#app/data/pokemon-forms";
import { initSpecies } from "#app/data/pokemon-species";
import { initAchievements } from "#app/system/achv";
import { initVouchers } from "#app/system/voucher";
import { initStatsKeys } from "#app/ui/game-stats-ui-handler";
import { initMysteryEncounters } from "#app/data/mystery-encounters/mystery-encounters";
import { beforeAll, vi } from "vitest";

process.env.TZ = "UTC";

/** Mock the override import to always return default values, ignoring any custom overrides. */
vi.mock("#app/overrides", async (importOriginal) => {
  const { defaultOverrides } = await importOriginal<typeof import("#app/overrides")>();

  return {
    default: defaultOverrides,
    defaultOverrides
  } satisfies typeof import("#app/overrides");
});

initVouchers();
initAchievements();
initStatsKeys();
initPokemonPrevolutions();
initBiomes();
initEggMoves();
initPokemonForms();
initSpecies();
initMoves();
initAbilities();
initLoggedInUser();
initMysteryEncounters();

global.testFailed = false;

beforeAll(() => {
  Object.defineProperty(document, "fonts", {
    writable: true,
    value: {
      add: () => {},
    }
  });
});
