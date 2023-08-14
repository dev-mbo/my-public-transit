import Dexie, { Table } from 'dexie'

export const db = new Dexie('MyPublicTransit')
db.version(1).stores({
  connections: '++id, name, type, route'
})
