import React, { useState } from "react";
import { Connection } from './Connection'
import { updateConnection, removeConnection, addConnection } from '../../utils/database'

type ListProps = {
    connections: IConnection[],
    visibleId: number | null,
    handleSetVisibleId: (id: number) => void,
    handleChangeConnection: (connection: IConnection) => void
}

export default function List({ connections, visibleId, handleSetVisibleId, handleChangeConnection }: ListProps): React.ReactNode {

    const [editId, setEditId] = useState<number | null>(null)

    const handleSetEditId = (id: number) => {
        if (editId === id) {
            setEditId(null)
        } else {
            setEditId(id)
        }
    }

    const handleUpdateConnection = (connection: IConnection) => {
        updateConnection(connection)
        setEditId(null)
    }

    const handleRemoveConnection = (id: number) => {
        removeConnection(id)
    }

    const handleAddConnection = () => {
        addConnection({
            name: "New connection",
            type: "bus",
            route: []
        })
    }
    
    return (
        <div className="connections-list">
            <div className="block">
                <button className="button is-primary" onClick={handleAddConnection}>
                    Add connection
                </button>
            </div>

            <div className="block">
                {/* <h2 className="title is-4">Connections:</h2> */}
                {!connections.length && 
                    <p>There are no bus, tram or train connections yet.</p>
                }
                {connections.map((connection,index) => {
                    return (
                        <React.Fragment key={connection.id} >
                            <Connection 
                                isEdit={editId === connection.id}
                                isVisible={visibleId === connection.id}
                                connection={connection} 
                                handleSetVisibleId={handleSetVisibleId}
                                handleSetEditId={handleSetEditId}
                                handleUpdateConnection={handleUpdateConnection}
                                handleRemoveConnection={handleRemoveConnection}
                                handleChangeConnection={handleChangeConnection} />

                            { index < (connections.length-1) && <hr /> }
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}