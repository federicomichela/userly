import _Vue from "vue";
import { GenericObject } from "@/services/Utils/types";
import { Device, Orientation } from "@/services/Utils/enums";

export class Utils {
  public toSortedString(
    obj: GenericObject,
    orderedKeys: string[],
    placeholder?: string,
    separator = ", "
  ): string | undefined {
    if (Object.values(obj).every((e: string | unknown) => !e)) {
      return placeholder;
    }

    const strValues = [];
    let parts: string[];
    let objProp: string;
    let value: any;

    for (const prop of orderedKeys) {
      parts = prop.split(".");
      objProp = parts.splice(0, 1)[0];
      value = obj[objProp];

      if (!value) continue;

      for (const subProp of parts) {
        value = value[subProp];
      }

      if (value) {
        if (parts.length && strValues.length) {
          strValues[strValues.length - 1] += ` ${value}`;
        } else {
          strValues.push(value);
        }
      }
    }

    return strValues.join(separator);
  }

  /** inspired by LevelUpCoding **/
  public detectDevice(): { device: string; orientation: string } {
    const device = navigator.maxTouchPoints ? Device.Mobile : Device.Desktop;
    const orientation = device === Device.Desktop ?
      (window.innerWidth < window.innerHeight ? Orientation.Portrait : Orientation.Landscape) :
      (!window.screen.orientation.angle ? Orientation.Portrait : Orientation.Landscape);

    return { device, orientation };
  }

  public isDesktop(): boolean {
    return !navigator.maxTouchPoints;
  }

  public isPortrait(): boolean {
    return (
      (this.isDesktop() && window.innerWidth < window.innerHeight) ||
      (!this.isDesktop() && !window.screen.orientation.angle)
    );
  }
}

export default function UtilsPlugin(app: _Vue.App<Element>): void {
  app.provide("$utils", new Utils());
}
