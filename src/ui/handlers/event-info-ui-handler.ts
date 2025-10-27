import { timedEventManager } from "#app/global-event-manager";
import { globalScene } from "#app/global-scene";
import { Button } from "#enums/buttons";
import { PokedexMonContainer } from "#ui/pokedex-mon-container";
import { addWindow } from "#ui/ui-theme";
import { getPokemonSpecies } from "#utils/pokemon-utils";
import { MessageUiHandler } from "./message-ui-handler";

export class EventInfoUiHandler extends MessageUiHandler {
  private infoContainer: Phaser.GameObjects.Container;
  /** container for the each pokemon sprites and icons */
  private starterSelectContainer: Phaser.GameObjects.Container;
  /** list of the containers added to pokemonIconsContainer for easier access */
  private pokemonContainers: PokedexMonContainer[] = [];

  setup() {
    const ui = this.getUi();
    if (!timedEventManager.isEventActive()) {
      console.log("No event active!");
      this.clear();
      return;
    }
    const eventEncounters = timedEventManager.getEventEncounters();
    this.starterSelectContainer = globalScene.add.container(0, -globalScene.scaledCanvas.height);
    this.starterSelectContainer.setVisible(false);
    ui.add(this.starterSelectContainer);
    const bgColor = globalScene.add.rectangle(
          0,
          0,
          globalScene.scaledCanvas.width,
          globalScene.scaledCanvas.height,
          0x006860,
        );
    bgColor.setOrigin(0, 0);
    this.starterSelectContainer.add(bgColor);
    const pokemonContainerWindow = addWindow(143, 18, 175, 161);
    const pokemonContainerBg = globalScene.add.image(
      144,
      19,
      "starter_container_bg",
    );
    pokemonContainerBg.setOrigin(0, 0);
    this.starterSelectContainer.add(pokemonContainerBg);
    this.starterSelectContainer.add(pokemonContainerWindow);
    pokemonContainerWindow.setVisible(false);
    const starterBoxContainer = globalScene.add.container(149, 9);
    for (let i=0;i<eventEncounters.length;i++) {
      const pkmnContainer = new PokedexMonContainer(getPokemonSpecies(eventEncounters[i].species)).setVisible(false);
      const pos = this.calcStarterPosition(i);
      pkmnContainer.setPosition(pos.x, pos.y);
      this.pokemonContainers.push(pkmnContainer);
      starterBoxContainer.add(pkmnContainer);
    }
    this.starterSelectContainer.add(starterBoxContainer);
    this.show([]);
  }
  show(args: any[]): boolean {
    this.pokemonContainers.forEach((container) => {
      container.setVisible(true);
      container.icon.setVisible(true);
    })
    this.starterSelectContainer.setVisible(true);
    return true;
  }
  calcStarterPosition(index: number): { x: number; y: number } {
    const yOffset = 13;
    const height = 17;
    const x = (index % 9) * 18;
    const y = yOffset + Math.floor(index / 9) * height;

    return { x, y };
  }
  processInput(button: Button): boolean {
      return false;
  }
}
