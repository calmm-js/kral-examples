import R from "ramda"

export const iota = n => Array(n).fill([]).map((_, i) => i)
export const pass = (...args) => R.last(args)(...R.dropLast(1, args))
