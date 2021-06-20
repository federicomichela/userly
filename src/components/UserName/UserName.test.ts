import { shallowMount } from "@vue/test-utils";
import UserName from "./UserName.vue";
import { $utils } from "@/unitTestsUtils";

describe("UserName.vue", () => {
  it("renders defaults name", () => {
    const wrapper = shallowMount(UserName, { global: { provide: { $utils } } });

    expect(wrapper.text()).toMatch("User Name");
  });

  it("renders defined props", () => {
    const first = "John";
    const last = "Doe";
    const wrapper = shallowMount(UserName, {
      global: { provide: { $utils } },
      props: { first, last },
    });

    expect(wrapper.text()).toMatch(`${first} ${last}`);
  });

  it("renders defaults until props are defined", async () => {
    const wrapper = shallowMount(UserName, { global: { provide: { $utils } } });
    const first = "John";
    const last = "Doe";
    const title = "Mr";

    expect(wrapper.text()).toMatch("User Name");

    await wrapper.setProps({ title, first, last });

    expect(wrapper.text()).toMatch(`${title} ${first} ${last}`);
  });
});
