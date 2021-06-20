import _Vue from "vue";
import { GenericObject } from "@/services/Utils/types";

class Utils {
  public toSortedString(obj: GenericObject, orderedKeys: string[], placeholder?: string): string | undefined {
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

    return strValues.join(", ");
  }
}

export default function UtilsPlugin(app: _Vue.App<Element>): void {
  app.provide("$utils", new Utils());
}
