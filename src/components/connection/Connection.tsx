import { Point as EditPoint } from '../route/Point' 
import { 
    faTrash, 
    faPlus, 
    faPen, 
    faXmark,
    faEye, 
    faEyeSlash,
    faBus,
    faTrainTram,
    faTrain,
    faArrowRight,
    faFlagCheckered
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uuidv4 } from 'uuid'
import React, { useState, useMemo } from 'react'

type ItemProps = {
    connection: IConnection,
    isEdit: boolean,
    isVisible: boolean,
    handleSetVisibleId: (id: number, editMode?: boolean) => void,
    handleSetEditId: (id: number) => void,
    handleUpdateConnection: (connection: IConnection) => void,
    handleRemoveConnection: (id: number) => void,
    handleChangeConnection: (connection: IConnection) => void
}
  
export function Connection({ connection, isEdit, isVisible, handleSetVisibleId, handleSetEditId, handleUpdateConnection, handleRemoveConnection, handleChangeConnection }: ItemProps): React.ReactNode {

    const [name, setName] = useState<string>(connection.name)
    const [type, setType] = useState<ConnectionType>(connection.type)

    const route = useMemo(() => connection.route.sort((a: IPoint, b: IPoint) => {
        return a.position - b.position
    }), [connection]) 
    const lastPos = Math.max(...route.map(point => point.position))

    const showRoute = () => {
        const start = route.length ? route[0].address : null  
        const end = route.length > 1 ? route[route.length - 1].address : null
        return (
            <div>
                {showType()}
                {start &&   
                    <>
                    <span>&nbsp;</span>
                    {start}
                    <span>&nbsp;</span>
                    </>
                }
                {end &&
                    <>
                    <FontAwesomeIcon icon={faArrowRight} /> 
                    <span>&nbsp;</span>
                    {end}
                    <span>&nbsp;</span>
                    <FontAwesomeIcon icon={faFlagCheckered} />
                    </>
                }
            </div>
        )

    }

    const showType = () => {
        switch(type) {
            case 'bus': return <FontAwesomeIcon icon={faBus} />
            case 'tram': return <FontAwesomeIcon icon={faTrainTram} />
            case 'train': return <FontAwesomeIcon icon={faTrain} />
        }
    }

    const handleSubmit = () => {
        handleUpdateConnection({
            id: connection.id,
            name: name,
            type: type,
            route: [
                ...route
            ]
        })
    }

    const handleRemovePoint = (id: string) => {
        const updatedRoute = route.filter(point => {
            if (point.id !== id) {
                return point
            }
        })
        handleChangeConnection({
            id: connection.id,
            name,
            type,
            route: updatedRoute
        })
    }

    const handleChangePoint = (point: IPoint) => {
        const itemOldPos = route.filter(item => item.id === point.id)[0].position
        const updatedRoute = route.map(item => {
            if (item.id === point.id) {
                return point
            }
            if (item.id !== point.id && item.position === point.position) {
                item.position = itemOldPos
            }
            return item
        })
        handleChangeConnection({
            id: connection.id,
            name,
            type,
            route: updatedRoute
        })
    }

    const handleAddPoint = () => {
        const uniqid = uuidv4()
        const updatedRoute = [ 
            ...route, 
            {
                id: uniqid,
                address: "",
                coords: {
                    lat: 0,
                    lon: 0
                },
                position: lastPos+1
            }
        ]
        handleChangeConnection({
            id: connection.id,
            name,
            type,
            route: updatedRoute
        })
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

                { isEdit &&
                <div className="field">
                    <label className="label">Type:</label>
                    <div className="control">
                        <div className="select">
                            <select value={type} onChange={(evt) => setType(evt.currentTarget.value as ConnectionType) }>
                                <option value="bus" >Bus</option>
                                <option value="tram">Tram</option>
                                <option value="train">Train</option>
                            </select>
                        </div> 
                    </div>
                </div>
                }
                
                <div className="field">
                    <label className="label">Route:</label>
                    <div className="control">
                        {isEdit ?
                            <ol>
                                {route.map(point => {
                                    return (
                                        <li key={point.id}>
                                            <EditPoint 
                                                point={point}
                                                isLast={point.position === lastPos} 
                                                handleChangePoint={handleChangePoint} 
                                                handleRemovePoint={handleRemovePoint} /> 
                                        </li>
                                    )
                                })}
                            </ol> : showRoute()
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
                <button className="button is-small mr-1" onClick={() => handleSetVisibleId(connection.id) }>
                { isVisible ? 
                    <FontAwesomeIcon icon={faEye}/> : 
                    <FontAwesomeIcon icon={faEyeSlash} /> 
                }
                </button> 

                <button className="button is-small mr-1" onClick={() => handleSetEditId(connection.id) }>
                { !isEdit ? 
                    <FontAwesomeIcon icon={faPen} /> : 
                    <FontAwesomeIcon icon={faXmark} />
                }
                </button>
                
                <button className="button is-small" onClick={() => handleRemoveConnection(connection.id!) }>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}