import React, { useState } from "react";
import { Connection } from './Connection'
import { updateConnection, removeConnection, addConnection, importExampleData } from '../../utils/database'

type ListProps = {
    connections: IConnection[],
    visibleId: number | null,
    handleSetVisibleId: (id: number, editMode?: boolean) => void,
    handleChangeConnection: (connection: IConnection) => void
}

export default function List({ connections, visibleId, handleSetVisibleId, handleChangeConnection }: ListProps): React.ReactNode {

    const [editId, setEditId] = useState<number | null>(null)

    const handleSetEditId = (id: number) => {
        if (editId === id) {
            setEditId(null)
        } else {
            setEditId(id)
            handleSetVisibleId(id, true)
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
                    <p>This looks very empty here, maybe you want to add some <a onClick={() => importExampleData()}>data</a>.</p>
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