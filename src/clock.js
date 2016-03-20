import K     from "kefir.react.html"
import Kefir from "kefir"
import React from "react"

const oncePerSecond = Kefir.constant().merge(Kefir.interval(1000))

export default () =>
  <K.div>
    {K(oncePerSecond, () => new Date().toString())}
  </K.div>
