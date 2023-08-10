export interface Point {
    name: string,
    coords: {
        x: number,
        y: number
    }
}
export interface Connection {
    id?: number,
    name: string, 
    type: "bus" | "tram" | "train",
    route: Point[]
}

  
export default function Item({ name, type, route }: Connection): React.ReactNode {
    return (
        <>
            <h1 className="text-xl">{ name }:</h1>
            <p className="text-sm">Type: {type}, Route: {route.length} points</p>
        </>
    )
}