import Atom               from "kefir-atom"
import K, {bind, classes} from "kefir-react-html"
import React              from "react"

import * as M from "./bmi-meta"

const Slider = ({title, units, value, ...props}) =>
  <div>
    <K.div>{title}: {value}{units}</K.div>
    <K.input type="range" {...bind({value})} {...props}/>
  </div>

const BMI = ({bmi}) =>
  <K.div {...classes("bmi", K(bmi, M.BMI.classification))}>
    <Slider title="Weight" units="kg" min={40}  max={140} value={bmi.lens(M.BMI.weight)}/>
    <Slider title="Height" units="cm" min={140} max={210} value={bmi.lens(M.BMI.height)}/>
    <K.div>BMI: <K.span className="bmi-value">{K(bmi, M.BMI.bmi)}</K.span></K.div>
  </K.div>

export default ({bmi = Atom(M.mock)} = {}) => <BMI bmi={bmi.lens(M.BMI.augment)}/>
