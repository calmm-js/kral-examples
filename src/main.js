import * as L                  from "partial.lenses"
import Atom                    from "kefir.atom"
import K, {bind}               from "kefir.react.html"
import React                   from "react"
import makeStored, {expireNow} from "atom.storage"
import makeUndo                from "atom.undo"

import BMI               from "./bmi-control"
import * as BM           from "./bmi-meta"
import Checkbox          from "./checkbox"
import Checkboxes        from "./checkboxes"
import WithUndoRedo      from "./with-undo-redo"
import Clock             from "./clock"
import Counter           from "./counter"
import InputAdd          from "./input-add"
import Phonebook         from "./phonebook-control"
import * as PM           from "./phonebook-meta"
import Scroll            from "./scroll"
import Converter         from "./converter"
import BigTable, * as BT from "./big-table-control"

import {pass} from "./util"

const Undo = props => makeUndo({Atom, ...props})
const Stored = ({key, ...props}) =>
  makeStored({key: `kral-examples:${key}`,
              storage: localStorage,
              time: 15*60*1000, // 15 minutes
              Atom,
              ...props})

expireNow({storage: localStorage, regex: /^kral-examples:/})

const Src = ({src, lines = ""}) =>
  <a target="_blank"
     href={`https://github.com/calmm-js/kral-examples/blob/master/src/${src}${lines}`}>{src}</a>

export default () =>
  <main>
    <h1>Kefir+React+Atom Examples</h1>

    <a href="https://github.com/calmm-js/kral-examples">GitHub</a>

    <section>
      <h2 id="big-table">Big table</h2>
      {pass(() => {
        const model = Atom(BT.mock)

        const Slider = ({prop, ...props}) =>
          <K.label>{prop}: {model.view(prop)}
            <K.input type="range" {...props} style={{width: "100%"}}
                     {...bind({value: model.lens(prop, L.normalize(Number))})}/>
          </K.label>

        return <div>
            <Slider min={50} max={1000} prop="tableHeight"/>
            <Slider min={0} max={10000} prop="rowCount"/>
            <Slider min={10} max={50} prop="rowHeight"/>
            <BigTable {...{model}}/>
          </div>})}
      <ul>
        <li><Src src="big-table-control.js"/></li>
        <li><Src src="main.js" lines="#L46-L60"/></li>
      </ul>
    </section>

    <section>
      <h2 id="counter">Simple counter</h2>
      <Counter value={Stored({key: "counter", value: 0})}/>
      <ul>
        <li><Src src="counter.js"/></li>
        <li><Src src="main.js" lines="#L69"/></li>
      </ul>
    </section>

    <section>
      <h2 id="clock">Simple clock</h2>
      <Clock/>
      <ul>
        <li><Src src="clock.js"/></li>
        <li><Src src="main.js" lines="#L78"/></li>
      </ul>
    </section>

    <section>
      <h2 id="checkbox">Simple checkbox</h2>
      <Checkbox checked={Stored({key: "checkbox", value: false})}/>
      <ul>
        <li><Src src="checkbox.js"/></li>
        <li><Src src="main.js" lines="#L87"/></li>
      </ul>
    </section>

    <section>
      <h2 id="converter">Celcius to Fahrenheit converter</h2>
      <Converter value={Stored({key: "converter", value: 0})}/>
      <ul>
        <li><Src src="converter.js"/></li>
        <li><Src src="main.js" lines="#L96"/></li>
      </ul>
    </section>

    <section>
      <h2 id="undo-redo-checkboxes">Checkboxes with Undo-Redo</h2>
      {pass(Undo({value: [true, false, true],
                  Atom: value => Stored({key: "undo-redo-checkboxes",
                                         value})}), checkeds =>
            <WithUndoRedo undo={checkeds.undo}
                          redo={checkeds.redo}>
              <Checkboxes checkeds={checkeds.lens(L.define([]))}/>
            </WithUndoRedo>)}
      <ul>
        <li><Src src="with-undo-redo.js"/></li>
        <li><Src src="checkboxes.js"/></li>
        <li><Src src="main.js" lines="#L105-L111"/></li>
      </ul>
    </section>

    <section>
      <h2 id="input-add">Input Add</h2>
      <InputAdd/>
      <ul>
        <li><Src src="input-add.js"/></li>
        <li><Src src="main.js" lines="#L121"/></li>
      </ul>
    </section>

    <section>
      <h2 id="scroll">Scroll</h2>
      <Scroll/>
      <ul>
        <li><Src src="scroll.js"/></li>
        <li><Src src="main.js" lines="#L130"/></li>
      </ul>
    </section>

    <section>
      <h2 id="phonebook">Phonebook</h2>
      {pass(Stored({key: "phonebook",
                    value: PM.mock,
                    Atom: value => Undo({value})}), phonebook =>
            <WithUndoRedo undo={phonebook.undo}
                          redo={phonebook.redo}>
              <Phonebook {...{phonebook}}/>
            </WithUndoRedo>)}
      <ul>
        <li><Src src="phonebook-control.js"/></li>
        <li><Src src="phonebook-meta.js"/></li>
        <li><Src src="main.js" lines="#L139-L145"/></li>
      </ul>
    </section>

    <section>
      <h2 id="bmi">BMI control</h2>
      <BMI/>
      <ul>
        <li><Src src="bmi-control.js"/></li>
        <li><Src src="bmi-meta.js"/></li>
        <li><Src src="main.js" lines="#L155"/></li>
      </ul>
    </section>

    <section>
      <h2 id="bmi-shared">BMI controls with a shared model</h2>
      <div style={{display: "flex"}}>
        {pass(Stored({key: "bmi-shared", value: BM.mock}), bmi =>
              [<BMI key="1" bmi={bmi}/>,
               <BMI key="2" bmi={bmi}/>])}
      </div>
      <ul>
        <li><Src src="main.js" lines="#L166-L168"/></li>
      </ul>
    </section>
  </main>
