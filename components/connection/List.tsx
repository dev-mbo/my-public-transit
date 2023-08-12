import React, { useState } from "react";
import { Connection as Item } from './Connection'
import { db, Connection } from '../../utils/db'
import { FileWatcherEventKind } from "typescript";

export default function List({ connections }: { connections: Connection[]}): React.ReactNode {

    const [visibleConnectionId, setVisibleConnectionId] = useState<number | null>(null)

    const handleSetVisibleConnectionId = (id: number) => {
        if (visibleConnectionId === id) {
            setVisibleConnectionId(null)
        } else {
            setVisibleConnectionId(id)
        }
    }

    const handleUpdateItem = (connection: Connection) => {
        db.table("connections")
            .update(connection.id, {
                ...connection
            })

        setVisibleConnectionId(null)
    }

    const handleRemoveItem = (id: number) => {
        db.table("connections")
            .where("id")
            .equals(id)
            .delete()
            .then((deleteCount) => {
                console.log(`Successfully deleted item with id ${id}`)
            })
    }

    const handleAddItem = () => {
        db.table("connections").add({
            name: "New connection",
            type: "bus",
            route: []
        })
    }
    
    return (
        <div className="connections-list">
            <div className="block">
                <button className="button is-primary" onClick={handleAddItem}>
                    Add connection
                </button>
            </div>

            <div className="block">
                <h2 className="title is-4">Connections:</h2>
                {connections.map((connection,index) => {
                    return (
                        <>
                            <Item 
                                key={connection.id} 
                                isEdit={visibleConnectionId === connection.id}
                                connection={connection} 
                                handleUpdateItem={handleUpdateItem}
                                handleSetVisibleConnectionId={handleSetVisibleConnectionId}
                                handleRemoveItem={handleRemoveItem} />
                            { index < (connections.length-1) && <hr /> }
                        </>
                    )
                })}
            </div>
        </div>
    )
}