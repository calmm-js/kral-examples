import * as R from "ramda"
import Atom   from "kefir.atom"
import K      from "kefir.react.html"
import React  from "react"

export default ({value = Atom(0)}) =>
  <div>
    <K.div>Count: {value}</K.div>
    <button onClick={() => value.modify(R.add(+1))}>+</button>
    <button onClick={() => value.modify(R.add(-1))}>-</button>
  </div>
