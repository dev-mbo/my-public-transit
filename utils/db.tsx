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
export type ConnectionType = "bus" | "tram" | "train"
export interface Connection {
    id: number,
    name: string,
    type: ConnectionType,
    route: Point[]
}


export const db = new Dexie('MyPublicTransit')
db.version(1).stores({
  connections: '++id, name, type, route'
})
