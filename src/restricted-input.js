import Atom         from "kefir.atom"
import K, {classes} from "kefir.react.html"
import React        from "react"

export const RestrictedInput = ({value, meta: {format, parse}, ...props}) => {
  const edited = Atom()
  const shown = K(value, edited, (value, edited) =>
                  edited === undefined ? format(value) : edited)
  const exit = e => {
    edited.set()
    e.target.blur()
  }
  return <K.input {...classes("restricted-input",
                              K(shown, shown =>
                                parse(shown) !== undefined
                                ? "valid"
                                : "invalid"))}
                  value={shown}
                  onChange={e => {
                    const input = e.target.value
                    const result = parse(input)
                    if (result !== undefined) {
                      edited.set()
                      value.set(result)
                    } else {
                      edited.set(input)
                    }
                  }}
                  onKeyDown={e => e.key === "Escape" && exit(e)}
                  onBlur={exit}
                  {...props}/>
}

export const number = {
  format: n => n.toString(),
  parse: s => {
    const n = parseFloat(s)
    return n.toString() === s ? n : undefined
  }
}

export const NumberInput = ({meta = number, type="number", ...props}) =>
  <RestrictedInput {...{meta, type}} {...props}/>
