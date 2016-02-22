import Atom               from "kefir-atom"
import K, {bind, classes} from "kefir-react-html"
import React              from "react"

const Slider = ({title, units, value, ...props}) =>
  <div>
    <K.div>{title}: {value}{units}</K.div>
    <K.input type="range" {...bind({value})} {...props}/>
  </div>

const Control = ({model: {weight, height, bmi, classification} = Control.model()}) =>
  <K.div {...classes("bmi", classification)}>
    <Slider title="Weight" units="kg" min={40}  max={140} value={weight}/>
    <Slider title="Height" units="cm" min={140} max={210} value={height}/>
    <K.div>BMI: <K.span className="bmi-value">{bmi}</K.span></K.div>
  </K.div>

Control.model = ({weight = Atom(80), height = Atom(180)} = {}) => {
  const bmi = K(weight, height, (w, h) => Math.round(w/(h * h * 0.0001)))
  const classification =
    K(bmi, bmi =>
        bmi < 15   ? "bmi-underweight bmi-underweight-severely"
      : bmi < 18.5 ? "bmi-underweight"
      : bmi < 25   ? "bmi-normal"
      : bmi < 30   ? "bmi-overweight"
      : bmi < 35   ? "bmi-obese"
      : bmi < 40   ? "bmi-obese bmi-obese-severely"
      :              "bmi-obese bmi-obese-very")
  return {weight, height, bmi, classification}
}

export default Control
