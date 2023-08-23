import Dexie from 'dexie'

export const db = new Dexie('MyPublicTransit')
db.version(1).stores({
  connections: '++id, name, type, route'
})

export const getConnections = (): Promise<IConnection[]> => db.table("connections").toArray()

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

export const importExampleData = () => {
  fetch('/data.json')
    .then(data => data.json())
    .then(json => {
      try {
        const connections: IConnection[] = json
        for (let connection of connections) {
          addConnection(connection)
        }
      } catch (error) {
        console.log(error)
      }
    })
}