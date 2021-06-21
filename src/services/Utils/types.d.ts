export type GenericObject = { [key: string]: any };

export interface UtilsService {
  toSortedString(obj: GenericObject, orderedKeys: string[], placeholder?: string, separator=", "): string | undefined;
  detectDevice(): { device: string; orientation: string };
  isDesktop(): boolean;
  isPortrait(): boolean;
}
