import Atom                    from "kefir-atom"
import K, {fromKefir, fromIds} from "kefir-react-html"
import React                   from "react"

import * as M from "./phonebook-meta"

const TextInput = ({value = Atom("")}) => {
  const editing = Atom(false)
  const exit = () => editing.set(false)
  const save = e => {value.set(e.target.value); exit(e)}
  return fromKefir(K(editing, e => e
    ? <K.input key="1"
               type="text"
               autoFocus
               defaultValue={value}
               onKeyDown={e => e.which === 13 && save(e)
                            || e.which === 27 && exit(e)}
               onBlur={save}/>
    : <K.input key="0"
               type="text"
               disabled
               {...{value}}
               onDoubleClick={() => editing.set(true)}/>))
}

const Contact = ({contact}) =>
  <div>
    <TextInput value={contact.lens(M.Contact.name)}/>
    <TextInput value={contact.lens(M.Contact.number)}/>
    <button onClick={() => contact.modify(M.Contact.remove)}>Remove</button>
  </div>

const Contacts = ({contacts}) =>
  <K.div>
    {fromIds(K(contacts, M.Contacts.ids), id =>
     <Contact key={id}
              contact={contacts.lens(M.Contacts.contactWith({id}))}/>)}
  </K.div>

export default ({phonebook = Atom(M.mock)}) =>
  <div>
    <button onClick={() => phonebook.modify(M.Phonebook.addContact())}>
      New
    </button>
    <Contacts contacts={phonebook.lens(M.Phonebook.contacts)}/>
  </div>
