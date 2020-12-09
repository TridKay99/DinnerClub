export type RecursivePick<T> = {
  [P in keyof T]?: RecursivePick<T[P]>
}