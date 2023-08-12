import React, { useState } from "react";
import { Point } from "@/utils/db"
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PointProps = {
    point: Point, 
    handleChangePoint: (item: Point) => void,
    handleRemovePoint: (id: string) => void
}

export function Point({ point, handleChangePoint, handleRemovePoint}: PointProps): React.ReactNode {

    const [address, setAddress] = useState<string>("")
    const [coords, setCoords] = useState<{lat: number, lon: number}>({lat: 0, lon: 0})
    const [isEdit, setIsEdit] = useState(true)

    const changeAddress = (evt: React.FormEvent<HTMLInputElement>) => {
        setAddress(evt.currentTarget.value)
        handleChangePoint({
            id: point.id,
            address: address,
            coords: {...coords}
        })
    }

    const changeCoords = (evt: React.FormEvent<HTMLInputElement>) => {
        const lat = Number(evt.currentTarget.value.split(",")[0])
        const lon = Number(evt.currentTarget.value.split(",")[1])
        setCoords({
            lat,
            lon
        })
        handleChangePoint({
            id: point.id,
            address: address,
            coords: coords
        })
    }

    return (
        <div className="block">
            <div className="columns">
                <div className="column is-two-thirds">
                    { isEdit &&  
                        <>
                        <div className="field">
                            <div className="label">Address:</div>
                            <div className="control">
                                <input type="text" className="input" value={address} onChange={(evt) => changeAddress(evt) } />
                            </div>
                        </div>
                        <div className="field">
                            <div className="label">Latitude/Longitude:</div>
                            <div className="control">
                                <input type="text" className="input" value={coords.lat + "," + coords.lon} onChange={(evt) => changeCoords(evt) } />
                            </div>
                        </div>
                        </>
                    }
                </div>
                <div className="column is-one-third">
                    <button className="button is-small mr-1" onClick={() => setIsEdit(!isEdit) }>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className="button is-small" onClick={() => handleRemovePoint(point.id) }>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
            
        </div>
    )
}