import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import ShowTheme from "../ShowTheme.vue";

describe("ShowTheme", () => {
  test("shows correct number of steps before emitting quit event", async () => {
    const numberPlayers = 5;
    const wrapper = mount(ShowTheme, {
      props: {
        numberPlayers,
      },
    });
    const buttonWrapper = wrapper.get("button");
    for (let i = 0; i < 10; i++) {
      await buttonWrapper.trigger("click");
    }
    expect(wrapper.emitted()).toHaveProperty("quit");
  });
  test("not quit before every player left game", async () => {
    const numberPlayers = 5;
    const wrapper = mount(ShowTheme, {
      props: {
        numberPlayers,
      },
    });
    const buttonWrapper = wrapper.get("button");
    for (let i = 0; i < 9; i++) {
      await buttonWrapper.trigger("click");
    }
    expect(wrapper.emitted()).not.toHaveProperty("quit");
  });
  test("displays to 4 players theme and one player no theme", async () => {
    const numberPlayers = 5;
    const wrapper = mount(ShowTheme, {
      props: {
        numberPlayers,
      },
    });
    const button = wrapper.get("button");
    const texts: string[] = [];
    for (let i = 0; i < 9; i++) {
      await button.trigger("click");
      texts.push(wrapper.text());
    }
    const tuNeSaisPasStrings = texts.filter((text) =>
      text.includes("tu ne sais pas")
    );

    function isPremierJoueurNeSaitPas(): boolean {
      return texts[0].includes("tu ne sais pas");
    }

    const stringifiedTexts = JSON.stringify(texts);
    if (isPremierJoueurNeSaitPas()) {
      expect(tuNeSaisPasStrings, stringifiedTexts).toHaveLength(1);
    } else {
      expect(tuNeSaisPasStrings, stringifiedTexts).toHaveLength(2);
    }
  });
});
