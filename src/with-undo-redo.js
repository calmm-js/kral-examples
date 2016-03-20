import K     from "kefir.react.html"
import R     from "ramda"
import React from "react"

export default ({undo, redo, ...props}) =>
  <div>
    <div>
      <K.button disabled={K(undo.has, R.not)}
                onClick={undo}>Undo</K.button>
      <K.button disabled={K(redo.has, R.not)}
                onClick={redo}>Redo</K.button>
    </div>
    <K.div {...props}/>
  </div>
