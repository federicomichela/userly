import { shallowMount } from "@vue/test-utils";
import UserLocation from "./UserLocation.vue";
import { nextTick } from "vue";

describe("UserLocation.vue", () => {
  it("renders defaults full address and redirects to coord 0, 0", () => {
    const wrapper = shallowMount(UserLocation);
    const anchor = wrapper.find("a");

    expect(anchor.text()).toMatch("42 Street, Some City, Postal Code, Some State");
    expect(anchor.element.href).toContain("0,0");
  });

  it("renders defined props", async () => {
    const location = {
      street: { number: 105, name: "Namsangongwon-gil" },
      city: "Seol",
      state: "South Korea",
      coordinates: { latitude: 37.5513445, longitude: 126.9881487 },
    };
    const wrapper = shallowMount(UserLocation, { props: { ...location } });
    const anchor = wrapper.find("a");

    expect(anchor.text()).toMatch(`${location.street.number} ${location.street.name}, ${location.city}, ${location.state}`);
    expect(anchor.element.href.endsWith(`${location.coordinates.latitude},${location.coordinates.longitude}`)).toBeTruthy();

    await wrapper.setProps({ postcode: "XXXX" });

    expect(wrapper.vm.postcode).toMatch("XXXX");
    expect(anchor.text()).toMatch(`${location.street.number} ${location.street.name}, ${location.city}, XXXX, ${location.state}`);
  });

  it("renders defaults until props are defined", async () => {
    const location = {
      street: { number: 105, name: "Namsangongwon-gil" },
      city: "Seol",
      state: "South Korea",
      coordinates: { latitude: 37.5513445, longitude: 126.9881487 },
    };
    const wrapper = shallowMount(UserLocation);
    const anchor = wrapper.find("a");

    expect(anchor.text()).toMatch("42 Street, Some City, Postal Code, Some State");
    expect(anchor.element.href).toContain("0,0");

    await wrapper.setProps({ city: location.city, state: location.state, coordinates: location.coordinates });

    expect(anchor.text()).toMatch(`${location.city}, ${location.state}`);
    expect(anchor.element.href.endsWith(`${location.coordinates.latitude},${location.coordinates.longitude}`)).toBeTruthy();
  });
});
