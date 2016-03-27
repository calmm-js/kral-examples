import Atom                    from "kefir.atom"
import K, {bindProps, fromIds} from "kefir.react.html"
import R                       from "ramda"
import React                   from "react"

import * as Window from "./window"

const mock = {
  tableHeight: 500,
  rowHeight: 30,
  rowCount: 10000,
  columns: ["ID", "ID * 10", "Random Number"],
  toRow: id => [id, id * 10, Math.floor(Math.random() * 100)]
}

const cellWidth = columns =>
  K(Window.innerWidth, columns, (innerWidth, columns) =>
    ({width: innerWidth / columns.length + "px"}))

const visibleRows = ({tableHeight, rowHeight, rowCount}, scrollTop) =>
  ({begin: Math.floor(scrollTop / rowHeight),
    end: Math.min(rowCount, Math.ceil((scrollTop + tableHeight) / rowHeight))})

const THead = ({columns}) =>
  <thead>
    <K.tr>
      {K(columns, R.mapi((column, i) =>
         <K.th key={i} style={cellWidth(columns)}>{column}</K.th>))}
    </K.tr>
  </thead>

const TBody = ({model, visibleRows}) =>
  <K.tbody>
    {fromIds(K(visibleRows, ({begin, end}) => R.range(begin, end)), i =>
       <K.tr key={i}
             style={K(model, ({rowHeight}) =>
                      ({position: "absolute",
                        top: i * rowHeight + "px",
                        borderBottom: "1px solid grey"}))}>
         {K(model, ({toRow, columns}) =>
            toRow(i).map((column, i) =>
              <K.td style={cellWidth(columns)} key={i}>{column}</K.td>))}
       </K.tr>)}
  </K.tbody>

export default ({model = mock, scrollTop = Atom(0)}) =>
  <div>
    <table style={{width: "100%",
                   overflowX: "hidden",
                   borderBottom: "1px solid black"}}>
      <THead columns={K(model, R.prop("columns"))}/>
    </table>
    <K.div {...bindProps({ref: "onScroll", scrollTop})}
           style={K(model, ({tableHeight}) =>
                    ({position: "relative",
                      overflowX: "hidden",
                      borderBottom: "1px solid black",
                      height: tableHeight + "px"}))}>
      <K.table style={K(model, ({rowCount, rowHeight}) =>
                        ({height: rowCount * rowHeight + "px"}))}>
        <TBody {...{model, visibleRows: K(model, scrollTop, visibleRows)}}/>
      </K.table>
    </K.div>
  </div>
