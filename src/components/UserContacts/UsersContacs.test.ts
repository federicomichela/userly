import { shallowMount } from "@vue/test-utils";
import UserContacts from "./UserContacts.vue";

describe("UserContacts.vue", () => {
  it("renders defaults email and phone", () => {
    const defaultEmail = "user@email.com";
    const defaultPhone = "+333 111 2222";
    const wrapper = shallowMount(UserContacts);
    const elements = wrapper.findAll("a");

    expect(elements.length).toBe(2);
    expect(elements[0].text()).toMatch(defaultEmail);
    expect(elements[1].text()).toMatch(defaultPhone);
  });

  it("renders defined props", () => {
    const email = "john.doe@example.com";
    const phone = "+99 888 7777";
    const wrapper = shallowMount(UserContacts, { props: { email, phone } });
    const elements = wrapper.findAll("a");

    expect(elements.length).toBe(2);
    expect(elements[0].text()).toMatch(email);
    expect(elements[1].text()).toMatch(phone);
  });

  it("renders defaults until props are defined", async () => {
    const defaultEmail = "user@email.com";
    const defaultPhone = "+333 111 2222";
    const email = "john.doe@example.com";
    const phone = "+99 888 7777";
    const wrapper = shallowMount(UserContacts);
    const elements = wrapper.findAll("a");

    expect(elements.length).toBe(2);
    expect(elements[0].text()).toMatch(defaultEmail);
    expect(elements[1].text()).toMatch(defaultPhone);

    await wrapper.setProps({ email, phone });

    expect(elements.length).toBe(2);
    expect(elements[0].text()).toMatch(email);
    expect(elements[1].text()).toMatch(phone);
  });
});
