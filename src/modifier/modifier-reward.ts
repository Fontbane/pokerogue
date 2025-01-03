import BattleScene from "#app/battle-scene";
import Pokemon from "#app/field/pokemon";
import { Modifiers } from "./modifiers";

export class Reward {
  public default: Modifiers;

  apply(scene: BattleScene) {}
}

export class AddPlayerModifierReward extends Reward {
  public default: Modifiers;
}

export class AddPokemonModifierReward extends Reward {
  public default: Modifiers;
}

export class PlayerModifierReward extends Reward {
  public default: Modifiers;
}
