import L    from "partial.lenses"
import R    from "ramda"
import uuid from "uuid"

export const mock =
  [{id: uuid.v4(), name: "Mr Digits", number: "1-23-456789"}]

export const Contact = {
  create: ({name = "", number = ""} = {}) => ({id: uuid.v4(), name, number}),
  remove: () => {},
  id: "id",
  name: "name",
  number: "number"
}

export const Contacts = {
  ids: R.map(L.view(Contact.id)),
  contactWith: id => L.find(R.whereEq(id))
}

export const Phonebook = {
  contacts: L.define([]),
  addContact: contact => R.append(Contact.create(contact))
}
