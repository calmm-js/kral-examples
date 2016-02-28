import Atom         from "kefir-atom"
import K, {fromIds} from "kefir-react-html"
import React        from "react"

import TextInput from "./text-input"
import * as M    from "./phonebook-meta"

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
