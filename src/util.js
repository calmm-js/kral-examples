import R from "ramda"

export const pass = (...args) => R.last(args)(...R.dropLast(1, args))
