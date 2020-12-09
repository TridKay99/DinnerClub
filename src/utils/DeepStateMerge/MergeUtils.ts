import {RecursivePick} from "./RecursivePick"
import _ from "lodash"
import {arrayAndUnderFinedBlatterMerger} from "./lodashUtils"

export const deepStateMerge = <T>(delta: RecursivePick<T>) => {
  return (prevState: T) => {
    return _.mergeWith({}, prevState, delta, arrayAndUnderFinedBlatterMerger)
  }
}