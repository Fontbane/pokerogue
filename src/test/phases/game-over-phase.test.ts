import { Biome } from "#enums/biome";
import { Abilities } from "#enums/abilities";
import { Moves } from "#enums/moves";
import { Species } from "#enums/species";
import GameManager from "#test/utils/gameManager";
import Phaser from "phaser";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { achvs } from "#app/system/achv";
import { Unlockables } from "#app/system/unlockables";
import { Challenges } from "#enums/challenges";
import { Type } from "#enums/type";

describe("Game Over Phase", () => {
  let phaserGame: Phaser.Game;
  let game: GameManager;

  beforeAll(() => {
    phaserGame = new Phaser.Game({
      type: Phaser.HEADLESS,
    });
  });

  afterEach(() => {
    game.phaseInterceptor.restoreOg();
  });

  beforeEach(() => {
    game = new GameManager(phaserGame);
    game.override
      .moveset([ Moves.MEMENTO, Moves.ICE_BEAM, Moves.SPLASH, Moves.ENERGY_BALL ])
      .ability(Abilities.BALL_FETCH)
      .battleType("single")
      .disableCrits()
      .enemyAbility(Abilities.BALL_FETCH)
      .enemyMoveset(Moves.SPLASH)
      .startingWave(200)
      .startingBiome(Biome.END)
      .startingLevel(10000);
  });

  it("winning a run should give rewards", async () => {
    await game.classicMode.startBattle([ Species.BULBASAUR ]);
    vi.spyOn(game.scene, "validateAchv");

    // Note: `game.doKillOpponents()` does not properly handle final boss
    // Final boss phase 1
    game.move.select(Moves.ICE_BEAM);
    await game.toNextTurn();

    // Final boss phase 2
    game.move.select(Moves.ICE_BEAM);
    await game.phaseInterceptor.to("PostGameOverPhase", false);

    // The game refused to actually give the vouchers during tests,
    // so the best we can do is to check that their reward phases occurred.
    expect(game.phaseInterceptor.log.includes("GameOverPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("UnlockPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("RibbonModifierRewardPhase")).toBe(true);
    expect(game.scene.gameData.unlocks[Unlockables.ENDLESS_MODE]).toBe(true);
    expect(game.scene.validateAchv).toHaveBeenCalledWith(achvs.CLASSIC_VICTORY);
    expect(game.scene.gameData.achvUnlocks[achvs.CLASSIC_VICTORY.id]).toBeTruthy();
  });

  it("winning a mono gen run should give rewards for just that gen", async () => {
    game.challengeMode.addChallenge(Challenges.SINGLE_GENERATION, 1, 0);
    await game.challengeMode.startBattle([ Species.BULBASAUR ]);
    vi.spyOn(game.scene, "validateAchv");

    // Note: `game.doKillOpponents()` does not properly handle final boss
    // Final boss phase 1
    game.move.select(Moves.ICE_BEAM);
    await game.toNextTurn();

    // Final boss phase 2
    game.move.select(Moves.ICE_BEAM);
    await game.phaseInterceptor.to("PostGameOverPhase", false);

    // The game refused to actually give the vouchers during tests,
    // so the best we can do is to check that their reward phases occurred.
    expect(game.phaseInterceptor.log.includes("GameOverPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("UnlockPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("RibbonModifierRewardPhase")).toBe(true);
    expect(game.scene.gameData.unlocks[Unlockables.ENDLESS_MODE]).toBe(true);
    expect(game.scene.validateAchv).toHaveBeenCalledWith(achvs.MONO_GEN_ONE_VICTORY);
    expect(game.scene.gameData.achvUnlocks[achvs.MONO_GEN_ONE_VICTORY.id]).toBeTruthy();
    expect(game.scene.gameData.achvUnlocks[achvs.MONO_GEN_TWO_VICTORY.id]).toBeFalsy();
  });

  it("winning a mono type run should give rewards for just that type", async () => {
    game.challengeMode.addChallenge(Challenges.SINGLE_TYPE, Type.GRASS + 1, 0);
    await game.challengeMode.startBattle([ Species.BULBASAUR ]);
    vi.spyOn(game.scene, "validateAchv");

    // Note: `game.doKillOpponents()` does not properly handle final boss
    // Final boss phase 1
    game.move.select(Moves.ICE_BEAM);
    await game.toNextTurn();

    // Final boss phase 2
    game.move.select(Moves.ICE_BEAM);
    await game.phaseInterceptor.to("PostGameOverPhase", false);

    // The game refused to actually give the vouchers during tests,
    // so the best we can do is to check that their reward phases occurred.
    expect(game.phaseInterceptor.log.includes("GameOverPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("UnlockPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("RibbonModifierRewardPhase")).toBe(true);
    expect(game.scene.gameData.unlocks[Unlockables.ENDLESS_MODE]).toBe(true);
    expect(game.scene.validateAchv).toHaveBeenCalledWith(achvs.MONO_GRASS);
    expect(game.scene.gameData.achvUnlocks[achvs.MONO_GRASS.id]).toBeTruthy();
    expect(game.scene.gameData.achvUnlocks[achvs.MONO_POISON.id]).toBeFalsy();
  });

  it("winning a fresh start run should give rewards", async () => {
    game.challengeMode.addChallenge(Challenges.FRESH_START, 1, 0);
    await game.challengeMode.startBattle([ Species.BULBASAUR ]);
    vi.spyOn(game.scene, "validateAchv");

    // Note: `game.doKillOpponents()` does not properly handle final boss
    // Final boss phase 1
    game.move.select(Moves.ICE_BEAM);
    await game.toNextTurn();

    // Final boss phase 2
    game.move.select(Moves.ICE_BEAM);
    await game.phaseInterceptor.to("PostGameOverPhase", false);

    // The game refused to actually give the vouchers during tests,
    // so the best we can do is to check that their reward phases occurred.
    expect(game.phaseInterceptor.log.includes("GameOverPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("UnlockPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("RibbonModifierRewardPhase")).toBe(true);
    expect(game.scene.gameData.unlocks[Unlockables.ENDLESS_MODE]).toBe(true);
    expect(game.scene.validateAchv).toHaveBeenCalledWith(achvs.FRESH_START);
    expect(game.scene.gameData.achvUnlocks[achvs.FRESH_START.id]).toBeTruthy();
  });

  it("winning a monogen + fresh start run should give rewards for both", async () => {
    game.challengeMode.addChallenge(Challenges.SINGLE_GENERATION, 1, 0);
    game.challengeMode.addChallenge(Challenges.FRESH_START, 1, 0);
    await game.challengeMode.startBattle([ Species.BULBASAUR ]);
    vi.spyOn(game.scene, "validateAchv");

    // Note: `game.doKillOpponents()` does not properly handle final boss
    // Final boss phase 1
    game.move.select(Moves.ICE_BEAM);
    await game.toNextTurn();

    // Final boss phase 2
    game.move.select(Moves.ICE_BEAM);
    await game.phaseInterceptor.to("PostGameOverPhase", false);

    // The game refused to actually give the vouchers during tests,
    // so the best we can do is to check that their reward phases occurred.
    expect(game.phaseInterceptor.log.includes("GameOverPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("UnlockPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("RibbonModifierRewardPhase")).toBe(true);
    expect(game.scene.gameData.unlocks[Unlockables.ENDLESS_MODE]).toBe(true);
    expect(game.scene.validateAchv).toHaveBeenCalledWith(achvs.MONO_GEN_ONE_VICTORY);
    expect(game.scene.validateAchv).toHaveBeenCalledWith(achvs.FRESH_START);
    expect(game.scene.gameData.achvUnlocks[achvs.MONO_GEN_ONE_VICTORY.id]).toBeTruthy();
    expect(game.scene.gameData.achvUnlocks[achvs.FRESH_START.id]).toBeTruthy();
    expect(game.scene.gameData.achvUnlocks[achvs.MONO_GEN_TWO_VICTORY.id]).toBeFalsy();
  });

  it("winning a flip stats + fresh start run should give rewards for only flip stats", async () => {
    game.challengeMode.addChallenge(Challenges.FLIP_STAT, 1, 0);
    game.challengeMode.addChallenge(Challenges.FRESH_START, 1, 0);
    await game.challengeMode.startBattle([ Species.BULBASAUR ]);
    vi.spyOn(game.scene, "validateAchv");

    // Note: `game.doKillOpponents()` does not properly handle final boss
    // Final boss phase 1
    game.move.select(Moves.ICE_BEAM);
    await game.toNextTurn();

    // Final boss phase 2
    game.move.select(Moves.ICE_BEAM);
    await game.phaseInterceptor.to("PostGameOverPhase", false);

    // The game refused to actually give the vouchers during tests,
    // so the best we can do is to check that their reward phases occurred.
    expect(game.phaseInterceptor.log.includes("GameOverPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("UnlockPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("RibbonModifierRewardPhase")).toBe(true);
    expect(game.scene.gameData.unlocks[Unlockables.ENDLESS_MODE]).toBe(true);
    expect(game.scene.validateAchv).toHaveBeenCalledWith(achvs.FRESH_START);
    expect(game.scene.gameData.achvUnlocks[achvs.FLIP_STATS.id]).toBeTruthy();
    expect(game.scene.gameData.achvUnlocks[achvs.FRESH_START.id]).toBeFalsy();
  });

  it("winning a flip stats + inverse battle run should give rewards for both and the secret achv", async () => {
    game.challengeMode.addChallenge(Challenges.FLIP_STAT, 1, 0);
    game.challengeMode.addChallenge(Challenges.INVERSE_BATTLE, 1, 0);
    await game.challengeMode.startBattle([ Species.BULBASAUR ]);
    vi.spyOn(game.scene, "validateAchv");

    // Note: `game.doKillOpponents()` does not properly handle final boss
    // Final boss phase 1
    game.move.select(Moves.ENERGY_BALL);
    await game.toNextTurn();

    // Final boss phase 2
    game.move.select(Moves.ENERGY_BALL);
    await game.phaseInterceptor.to("PostGameOverPhase", false);

    // The game refused to actually give the vouchers during tests,
    // so the best we can do is to check that their reward phases occurred.
    expect(game.phaseInterceptor.log.includes("GameOverPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("UnlockPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("RibbonModifierRewardPhase")).toBe(true);
    expect(game.scene.gameData.unlocks[Unlockables.ENDLESS_MODE]).toBe(true);
    expect(game.scene.validateAchv).toHaveBeenCalledWith(achvs.FLIP_STATS);
    expect(game.scene.validateAchv).toHaveBeenCalledWith(achvs.INVERSE_BATTLE);
    expect(game.scene.validateAchv).toHaveBeenCalledWith(achvs.FLIP_INVERSE);
    expect(game.scene.gameData.achvUnlocks[achvs.FLIP_STATS.id]).toBeTruthy();
    expect(game.scene.gameData.achvUnlocks[achvs.INVERSE_BATTLE.id]).toBeTruthy();
    expect(game.scene.gameData.achvUnlocks[achvs.FLIP_INVERSE.id]).toBeTruthy();
  });

  it("losing a run should not give rewards", async () => {
    await game.classicMode.startBattle([ Species.BULBASAUR ]);
    vi.spyOn(game.scene, "validateAchv");

    game.move.select(Moves.MEMENTO);
    await game.phaseInterceptor.to("PostGameOverPhase", false);

    expect(game.phaseInterceptor.log.includes("GameOverPhase")).toBe(true);
    expect(game.phaseInterceptor.log.includes("UnlockPhase")).toBe(false);
    expect(game.phaseInterceptor.log.includes("RibbonModifierRewardPhase")).toBe(false);
    expect(game.phaseInterceptor.log.includes("GameOverModifierRewardPhase")).toBe(false);
    expect(game.scene.gameData.unlocks[Unlockables.ENDLESS_MODE]).toBe(false);
    expect(game.scene.validateAchv).not.toHaveBeenCalledWith(achvs.CLASSIC_VICTORY);
    expect(game.scene.gameData.achvUnlocks[achvs.CLASSIC_VICTORY.id]).toBeFalsy();
  });
});
