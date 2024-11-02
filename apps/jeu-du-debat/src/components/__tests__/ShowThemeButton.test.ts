import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import ShowThemeButton from "../ShowThemeButton.vue";

describe("ShowThemeButton", () => {
  test("hides message", async () => {
    const SENT_MESSAGE = "MESSAGE ENVOYÉ";
    const wrapper = mount(ShowThemeButton, {
      props: {
        msg: SENT_MESSAGE,
        show: false,
      },
    });
    expect(wrapper.get("h2").isVisible()).toBeFalsy();
  });
  test("shows message", async () => {
    const SENT_MESSAGE = "MESSAGE ENVOYÉ";
    const wrapper = mount(ShowThemeButton, {
      props: {
        msg: SENT_MESSAGE,
        show: true,
      },
    });
    expect(wrapper.get("h2").isVisible()).toBeTruthy();
  });
});
