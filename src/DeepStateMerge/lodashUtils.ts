export const arrayAndUnderFinedBlatterMerger = (objValue: any, srcValue: any, key: string, obj: any) => {
  if(Array.isArray(srcValue)) {
    return srcValue
  }

  if(srcValue === undefined) {
    obj[key] = undefined;
  }

  return undefined
}