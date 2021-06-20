export type GenericObject = { [key: string]: any };

export interface UtilsService {
  toSortedString(obj: GenericObject, orderedKeys: string[], placeholder?: string, separator=", "): string | undefined
}
