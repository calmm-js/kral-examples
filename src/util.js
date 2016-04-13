import * as R from "ramda"

export const pass = (...args) => R.last(args)(...R.dropLast(1, args))

export const mapi = R.curry((x2i2y, xs) => xs.map(x2i2y))
