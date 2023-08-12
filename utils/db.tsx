import Dexie, { Table } from 'dexie'

export interface Point {
    id: string,
    address: string,
    description?: string,
    coords: {
        lat: number,
        lon: number
    }
}
export interface Connection {
    id: number,
    name: string,
    type: "bus" | "tram" | "train",
    route: Point[]
}


export const db = new Dexie('MyPublicTransit')
db.version(1).stores({
  connections: '++id, name, type, route'
})
