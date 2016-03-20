import Atom  from "kefir.atom"
import L     from "partial.lenses"
import React from "react"
import Undo  from "atom.undo"

import BMI          from "./bmi-control"
import {mock}       from "./bmi-meta"
import Checkbox     from "./checkbox"
import Checkboxes   from "./checkboxes"
import WithUndoRedo from "./with-undo-redo"
import Clock        from "./clock"
import Counter      from "./counter"
import InputAdd     from "./input-add"
import Phonebook    from "./phonebook-control"
import Scroll       from "./scroll"

import {pass} from "./util"

const Src = ({src}) => <a target="_blank" href={`../src/${src}`}>{src}</a>

export default () =>
  <main>
    <h1>Kefir+React+Atom Examples</h1>

    <a href="https://github.com/calmm-js/kral-examples">GitHub</a>

    <section>
      <h2 id="counter">Simple counter</h2>
      <Counter/>
      <ul>
        <li><Src src="counter.js"/></li>
        <li><Src src="main.js"/></li>
      </ul>
    </section>

    <section>
      <h2 id="clock">Simple clock</h2>
      <Clock/>
      <ul>
        <li><Src src="clock.js"/></li>
        <li><Src src="main.js"/></li>
      </ul>
    </section>

    <section>
      <h2 id="checkbox">Simple checkbox</h2>
      <Checkbox/>
      <ul>
        <li><Src src="checkbox.js"/></li>
        <li><Src src="main.js"/></li>
      </ul>
    </section>

    <section>
      <h2 id="undo-redo-checkboxes">Checkboxes with Undo-Redo</h2>
      {pass(Undo({value: [true, false, true], Atom}), checkeds =>
            <WithUndoRedo undo={checkeds.undo}
                          redo={checkeds.redo}>
              <Checkboxes checkeds={checkeds.lens(L.define([]))}/>
            </WithUndoRedo>)}
      <ul>
        <li><Src src="with-undo-redo.js"/></li>
        <li><Src src="checkboxes.js"/></li>
        <li><Src src="main.js"/></li>
      </ul>
    </section>

    <section>
      <h2 id="input-add">Input Add</h2>
      <InputAdd/>
      <ul>
        <li><Src src="input-add.js"/></li>
        <li><Src src="main.js"/></li>
      </ul>
    </section>

    <section>
      <h2 id="scroll">Scroll</h2>
      <Scroll/>
      <ul>
        <li><Src src="scroll.js"/></li>
        <li><Src src="main.js"/></li>
      </ul>
    </section>

    <section>
      <h2 id="phonebook">Phonebook</h2>
      <Phonebook/>
      <ul>
        <li><Src src="phonebook-control.js"/></li>
        <li><Src src="phonebook-meta.js"/></li>
        <li><Src src="main.js"/></li>
      </ul>
    </section>

    <section>
      <h2 id="bmi">BMI control</h2>
      <BMI/>
      <ul>
        <li><Src src="bmi-control.js"/></li>
        <li><Src src="bmi-meta.js"/></li>
        <li><Src src="main.js"/></li>
      </ul>
    </section>

    <section>
      <h2 id="bmi-shared">BMI controls with a shared model</h2>
      <div style={{display: "flex"}}>
        {pass(Atom(mock), bmi =>
              [<BMI key="1" bmi={bmi}/>,
               <BMI key="2" bmi={bmi}/>])}
      </div>
      <ul>
        <li><Src src="main.js"/></li>
      </ul>
    </section>
  </main>
