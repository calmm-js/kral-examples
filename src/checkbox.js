import Atom      from "kefir.atom"
import K, {bind} from "kefir.react.html"
import React     from "react"

export default ({checked = Atom(false)}) =>
  <div>
    <label><K.input type="checkbox" {...bind({checked})}/>Toggle me</label>
    <K.p>{K(checked, c => c ? "ON" : "off")}</K.p>
  </div>
