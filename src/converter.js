import Atom      from "kefir.atom"
import K, {bind} from "kefir.react.html"
import React     from "react"

export default ({value = Atom("0")}) =>
  <K.p><K.input {...bind({value})}/>°C is {K(value, c => c * 9/5 + 32)}°F</K.p>
