import React, { useState } from "react";
import { Connection as Item } from './Connection'
import { db } from '../../utils/db'

type ListProps = {
    connections: IConnection[],
    visibleId: number | null,
    handleSetVisibleId: (id: number) => void
}
export default function List({ connections, visibleId, handleSetVisibleId }: ListProps): React.ReactNode {

    const [editId, setEditId] = useState<number | null>(null)

    const handleSetEditId = (id: number) => {
        if (editId === id) {
            setEditId(null)
        } else {
            setEditId(id)
        }
    }

    const handleUpdateItem = (connection: IConnection) => {
        db.table("connections")
            .update(connection.id, {
                ...connection
            })

        setEditId(null)
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
                        <React.Fragment key={connection.id} >
                            <Item 
                                isEdit={editId === connection.id}
                                isVisible={visibleId === connection.id}
                                connection={connection} 
                                handleUpdateItem={handleUpdateItem}
                                handleSetVisibleId={handleSetVisibleId}
                                handleSetEditId={handleSetEditId}
                                handleRemoveItem={handleRemoveItem} />

                            { index < (connections.length-1) && <hr /> }
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}