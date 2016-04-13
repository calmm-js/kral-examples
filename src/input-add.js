import * as R    from "ramda"
import Atom      from "kefir.atom"
import K, {bind} from "kefir.react.html"
import React     from "react"

export default ({elems = Atom([]), entry = Atom("")}) =>
  <div>
    <div>
      <K.input type="text" {...bind({value: entry})}/>
      <button onClick={() => {const elem = entry.get().trim()
                              if (elem) {
                                elems.modify(R.append(elem))
                                entry.set("")}}}>
        Add
      </button>
    </div>
    <K.ul>
      {K(elems, elems => elems.map((elem, i) => <li key={i}>{elem}</li>))}
    </K.ul>
  </div>
