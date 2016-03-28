import * as L from "partial.lenses"
import R      from "ramda"

export const mock = {height: 180, weight: 80}

export const BMI = {
  augment: L.augment({
    bmi: ({height, weight}) => Math.round(weight/(height * height * 0.0001))
  }),
  bmi: R.prop("bmi"),
  height: "height",
  weight: "weight",
  classification: ({bmi}) =>
      bmi < 15   ? "bmi-underweight bmi-underweight-severely"
    : bmi < 18.5 ? "bmi-underweight"
    : bmi < 25   ? "bmi-normal"
    : bmi < 30   ? "bmi-overweight"
    : bmi < 35   ? "bmi-obese"
    : bmi < 40   ? "bmi-obese bmi-obese-severely"
    :              "bmi-obese bmi-obese-very"
}
