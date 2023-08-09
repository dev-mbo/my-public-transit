'use client'
import Image from 'next/image'
import Map from './components/map'
import { useState, useEffect } from 'react'
import Dexie, { Table } from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks' 

interface Point {
  name: string,
  coords: {
    x: number,
    y: number
  }
}
interface Connection {
  id?: number,
  name: string, 
  type: "bus" | "tram" | "train",
  route: Point[]
}

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
      {connections?.map(conn => {
        return (
          <>
          <h1>{conn.id} - {conn.name} ({conn.type})</h1>
          <ul>
          {conn.route.map(point => <li>{point.name} ({point.coords.x}, {point.coords.y})</li>)}
          </ul>
          </>
        )
      })}
      <Map />
    </main>
  )
}
