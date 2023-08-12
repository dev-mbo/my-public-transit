import { db, Connection, Point, ConnectionType } from "@/utils/db"
import { Point as EditPoint } from '../route/Point' 
import { faTrash, faPlus, faPen, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'

type ItemProps = {
    connection: Connection,
    isEdit: boolean,
    handleSetVisibleConnectionId: (id: number) => void,
    handleUpdateItem: (connection: Connection) => void,
    handleRemoveItem: (id: number) => void
}
  
export function Connection({ connection, isEdit, handleSetVisibleConnectionId, handleUpdateItem, handleRemoveItem }: ItemProps): React.ReactNode {

    //const [ isEdit, setIsEdit ] = useState<boolean>(false)
    const [ showOnMap, setShowOnMap ] = useState<boolean>(false)
    const [ name, setName ] = useState<string>(connection.name)
    const [ type, setType ] = useState<ConnectionType>(connection.type)
    const [ route, setRoute ] = useState<Point[]>(connection.route) 

    const handleSubmit = () => {
        handleUpdateItem({
            id: connection.id,
            name: name,
            type: type,
            route: [
                ...route
            ]
        })
    }


    const handleRemovePoint = (id: string) => {
        setRoute(route.filter(point => {
            if (point.id !== id) {
                return point
            }
        }))
    }

    const handleChangePoint = (item: Point) => {
        setRoute(route.map(point => {
            if (point.id === item.id) {
                return item
            }
            return point
        }))
    }

    const handleAddPoint = () => {
        const uniqid = uuidv4();
        setRoute([ 
            ...route, 
            {
                id: uniqid,
                address: "",
                coords: {
                    lat: 0,
                    lon: 0
                }
            }
        ])
    }

    return (
        <div className="columns content">
            <div className="column is-two-thirds">
                <div className="field">
                    <label className="label">Name:</label>
                    <div className="control">
                        { isEdit ?
                            <input className="input" 
                                type="text" 
                                placeholder="Bus, tram or train description" 
                                value={name}
                                onChange={(evt) => setName(evt.currentTarget.value) } 
                            /> :
                            <p>{ name }</p>
                        }
                    </div>
                </div>
                <div className="field">
                    <label className="label">Type:</label>
                    <div className="control">
                        { isEdit ? 
                            <div className="select">
                                <select value={type} onChange={(evt) => setType(evt.currentTarget.value as ConnectionType) }>
                                    <option value="bus" >Bus</option>
                                    <option value="tram">Tram</option>
                                    <option value="train">Train</option>
                                </select>
                            </div> :
                            <p>{ type }</p>
                        }
                    </div>
                </div>
                
                <div className="field">
                    <label className="label">Route:</label>
                    <div className="control">
                        {isEdit ? 
                            route.map(point => {
                                return (
                                    <EditPoint 
                                        key={point.id} 
                                        point={point} 
                                        handleChangePoint={handleChangePoint} 
                                        handleRemovePoint={handleRemovePoint} /> 
                                )
                            }) : route.length && 
                                <p>
                                    From { route[0].address } to { route[route.length - 1].address }
                                </p> 
                        }
                    </div>
                </div>

                {isEdit &&
                    <div className="field">
                        <div className="control">
                            <button className="button is-small" onClick={() => handleAddPoint()}>
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp; Add point
                            </button>
                        </div>
                    </div>
                }

                {isEdit &&
                    <div className="field">
                        <div className="control">
                            <button className="button is-link" onClick={() => handleSubmit()}>Submit</button>
                        </div>
                    </div>
                }
            </div>

            <div className="column is-one-third">
                       
                { showOnMap ? 
                    <button className="button is-small mr-1" onClick={() => setShowOnMap(!showOnMap) }>
                        <FontAwesomeIcon icon={faEye}/>
                    </button> :
                    <button className="button is-small mr-1 is-dark" onClick={() => setShowOnMap(!showOnMap) }>
                        <FontAwesomeIcon icon={faEye} inverse />
                    </button>
                }

                <button className="button is-small mr-1" onClick={() => handleSetVisibleConnectionId(connection.id) }>
                    <FontAwesomeIcon icon={faPen} />
                </button>
                
                <button className="button is-small" onClick={() => handleRemoveItem(connection.id!) }>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}