import K     from "kefir-react-html"
import Kefir from "kefir"
import React from "react"

const seconds = Kefir.constant().merge(Kefir.interval(1000))

export default () => <K.div>{K(seconds, () => new Date().toString())}</K.div>
