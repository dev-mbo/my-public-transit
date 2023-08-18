import Dexie from 'dexie'

export const db = new Dexie('MyPublicTransit')
db.version(1).stores({
  connections: '++id, name, type, route'
})


export const updateConnection = (connection: IConnection) => {
  db.table("connections")
      .update(connection.id, {
          ...connection
      })

}

export const removeConnection = (id: number) => {
  db.table("connections")
      .where("id")
      .equals(id)
      .delete()
      .then((deleteCount) => {
          console.log(`Successfully deleted item with id ${id}`)
      })
}

export const addConnection = (connection: {name: string, type: ConnectionType, route: IPoint[]}) => {
  db.table("connections").add(connection)
}