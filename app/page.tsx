'use client'
import Image from 'next/image'
import Map from '../components/map/Map'
import Item, { Connection, Point } from '../components/connection/Item'
import { default as ConnectionList } from '../components/connection/List'
import Dexie, { Table } from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks' 


const db = new Dexie('MyPublicTransit')
db.version(1).stores({
  connections: '++id, name, type, route'
})

// db.table("connections").add({
//   name: "test 1",
//   type: "bus",
//   route: [{
//     name: "test 1",
//     coords: {
//       x: 1,
//       y: 2
//     }
//   }, {
//     name: "test 2",
//     coords: {
//       x: 3,
//       y: 4
//     }
//   }]
// })

export default function Home() {

  const connections = useLiveQuery((): Promise<Connection[]> => {
      const connections = db.table("connections").toArray();
      return connections || [];
  }, [])


  return (
    <main>
      <div className="columns">
        <div className="column is-one-third">
          <ConnectionList connections={connections} />
        </div>
        <div className="column is-two-thirds">
          <Map />
        </div>
      </div>
    </main>
  )
}
