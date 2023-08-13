import React, { useState } from "react";
import { Point } from "@/utils/db"
import { 
    faTrash, 
    faPen,
    faCircleInfo 
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PointProps = {
    point: Point, 
    handleChangePoint: (item: Point) => void,
    handleRemovePoint: (id: string) => void
}

export function Point({ point, handleChangePoint, handleRemovePoint}: PointProps): React.ReactNode {

    const [address, setAddress] = useState<string>(point.address)
    const [coords, setCoords] = useState<{lat: number, lon: number}>(point.coords)

    const changeAddress = (evt: React.FormEvent<HTMLInputElement>) => {
        const value = evt.currentTarget.value 
        setAddress(value)
        handleChangePoint({
            id: point.id,
            address: value,
            coords
        })
    }

    const changeCoord = (evt: React.FormEvent<HTMLInputElement>) => {
        const tmp = evt.currentTarget.value.split(",")
        const lon = Number.parseFloat(tmp[0])
        const lat = Number.parseFloat(tmp[1])
        setCoords({
            lon: lon,
            lat: lat
        })
        handleChangePoint({
            id: point.id,
            address: address,
            coords: {
                lat: lat,
                lon: lon
            }
        })
    }


    return (
        <div className="block">
            <div className="field">
                <div className="label">Address:</div>
                <div className="control">
                    <input type="text" className="input" value={address} onChange={(evt) => changeAddress(evt) } />
                </div>
            </div>
            <div className="field">
                <div className="label">
                    Latitude/Longitude:

                    <span className="icon" data-tooltip="click on a place in the map to copy coordinates to clipboard">
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </span>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input type="text" className="input" value={coords.lon + "," + coords.lat} onChange={(evt) => changeCoord(evt) } />
                        </div>
                    </div>
                </div>
            </div>
            <div className="field">
                <button className="button is-small" onClick={() => handleRemovePoint(point.id) }>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
            
    )
}