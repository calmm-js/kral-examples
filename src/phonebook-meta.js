import L    from "partial.lenses"
import R    from "ramda"

import {iota} from "./util"

export const mock =
  [{name: "Mr Digits", number: "1-23-456789"}]

export const Contact = {
  create: ({name = "", number = ""} = {}) => ({name, number}),
  remove: () => {},
  id: "id",
  name: "name",
  number: "number"
}

export const Contacts = {
  indices: R.pipe(R.length, iota)
}

export const Phonebook = {
  contacts: L.define([]),
  addContact: contact => R.append(Contact.create(contact))
}
