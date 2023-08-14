export {}

declare global { 
    export interface IPoint {
        id: string,
        address: string,
        description?: string,
        coords: {
            lat: number,
            lon: number
        }
    }
    export type ConnectionType = "bus" | "tram" | "train"
    export interface IConnection {
        id: number,
        name: string,
        type: ConnectionType,
        route: Point[]
    }  
}