import K, {fromIds} from "kefir.react.html"
import R            from "ramda"
import React        from "react"

import {iota} from "./util"

import Checkbox from "./checkbox"

const RemovableCheckbox = ({checked}) =>
  <div style={{margin: "0.5em"}}>
    <button onClick={() => checked.set()}>Remove</button>
    <Checkbox {...{checked}}/>
  </div>

export default ({checkeds}) =>
  <div>
    <button onClick={() => checkeds.modify(R.append(false))}>New</button>
    <K.div style={{display: "flex", flexWrap: "wrap"}}>
      {fromIds(K(checkeds, R.pipe(R.length, iota)), i =>
        <RemovableCheckbox key={i} checked={checkeds.lens(i)}/>)}
    </K.div>
  </div>
