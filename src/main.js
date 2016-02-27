import Atom  from "kefir-atom"
import React from "react"

import BMI       from "./bmi-control"
import {mock}    from "./bmi-meta"
import Checkbox  from "./checkbox"
import Clock     from "./clock"
import Counter   from "./counter"
import InputAdd  from "./input-add"
import Phonebook from "./phonebook-control"
import Scroll    from "./scroll"

const Src = ({src}) => <a target="_blank" href={`../src/${src}`}>{src}</a>

export default () =>
  <main>
    <h1>Kefir+React+Atom Examples</h1>

    <section>
      <h2>Simple counter</h2>
      <Counter/>
      <Src src="counter.js"/>
    </section>

    <section>
      <h2>Simple clock</h2>
      <Clock/>
      <Src src="clock.js"/>
    </section>

    <section>
      <h2>Simple checkbox</h2>
      <Checkbox/>
      <Src src="checkbox.js"/>
    </section>

    <section>
      <h2>Input Add</h2>
      <InputAdd/>
      <Src src="input-add.js"/>
    </section>

    <section>
      <h2>Scroll</h2>
      <Scroll/>
      <Src src="scroll.js"/>
    </section>

    <section>
      <h2>Phonebook</h2>
      <Phonebook/>
      <ul>
        <li><Src src="phonebook-control.js"/></li>
        <li><Src src="phonebook-meta.js"/></li>
      </ul>
    </section>

    <section>
      <h2>BMI control</h2>
      <BMI/>
      <ul>
        <li><Src src="bmi-control.js"/></li>
        <li><Src src="bmi-meta.js"/></li>
      </ul>
    </section>

    <section>
      <h2>BMI controls with a shared model</h2>
      <div style={{display: "flex"}}>
        {(bmi => [<BMI key="1" bmi={bmi}/>,
                  <BMI key="2" bmi={bmi}/>])(Atom(mock))}
      </div>
    </section>

  </main>
