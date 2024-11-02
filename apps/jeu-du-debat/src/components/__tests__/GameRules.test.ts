import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import GameRules from "../GameRules.vue";

describe("GameRules", () => {
  test("should display first part of rules on loading", async () => {
    const wrapper = mount(GameRules);
    expect(wrapper.text()).toContain(
      "Dans ce jeu, tout le monde doit discuter autour d'un débat"
    );
  });
  test("should NOT display second part of rules on loading", async () => {
    const wrapper = mount(GameRules);
    expect(wrapper.text()).not.toContain(
      "Pour jouer à ce jeu, choisissez le nombre de joueurs"
    );
  });
  test("should show 'suivant' text on button", async () => {
    const wrapper = mount(GameRules);
    const buttonWrapper = wrapper.find("button");
    expect(buttonWrapper.text()).toEqual("Suivant");
  });
  describe("on click", () => {
    test("should NOT display first part of rules after click on button", async () => {
      const wrapper = mount(GameRules);
      const buttonWrapper = wrapper.find("button");
      await buttonWrapper.trigger("click");
      expect(wrapper.text()).not.toContain(
        "Dans ce jeu, tout le monde doit discuter autour d'un débat, mais une"
      );
    });
    test("should display second part of rules after click on button", async () => {
      const wrapper = mount(GameRules);
      const buttonWrapper = wrapper.find("button");
      await buttonWrapper.trigger("click");
      expect(wrapper.text()).toContain(
        "Pour jouer à ce jeu, choisissez le nombre de joueurs, faites passer le téléphone à chaque joueur à tour de rôle pour recevoir le sujet et débattez."
      );
    });
    test("should fire event on second click on button", async () => {
      const wrapper = mount(GameRules);
      const buttonWrapper = wrapper.find("button");
      await buttonWrapper.trigger("click");
      await buttonWrapper.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("quit");
    });
    test("should not fire event quit on first click on button", async () => {
      const wrapper = mount(GameRules);
      const buttonWrapper = wrapper.find("button");
      await buttonWrapper.trigger("click");
      expect(wrapper.emitted()).not.toHaveProperty("quit");
    });
  });
});
