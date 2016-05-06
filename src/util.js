import * as R from "ramda"

export const pass = (x, f) => f(x)
export const scope = f => f()

export const mapi = R.curry((x2i2y, xs) => xs.map(x2i2y))
