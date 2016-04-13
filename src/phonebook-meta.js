import * as L from "partial.lenses"
import * as R from "ramda"

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
  indices: R.pipe(R.length, R.range(0))
}

export const Phonebook = {
  contacts: L.define([]),
  addContact: R.pipe(Contact.create, R.append)
}
