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

    const [address, setAddress] = useState<string>(point.address)
    const [lon, setLon] = useState<number>(point.coords.lon)
    const [lat, setLat] = useState<number>(point.coords.lat)

    const changeAddress = (evt: React.FormEvent<HTMLInputElement>) => {
        const value = evt.currentTarget.value 
        setAddress(value)
        handleChangePoint({
            id: point.id,
            address: value,
            coords: {
                lat: lat,
                lon: lon
            }
        })
    }

    const changeLat = (evt: React.FormEvent<HTMLInputElement>) => {
        const value = Number.parseFloat(evt.currentTarget.value) 
        setLat(value)
        handleChangePoint({
            id: point.id,
            address: address,
            coords: {
                lat: value,
                lon: lon
            }
        })
    }

    const changeLon = (evt: React.FormEvent<HTMLInputElement>) => {
        const value = Number.parseFloat(evt.currentTarget.value) 
        setLon(value)
        handleChangePoint({
            id: point.id,
            address: address,
            coords: {
                lat: lat,
                lon: value
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
                <div className="label">Latitude/Longitude:</div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input type="text" className="input" value={lat} onChange={(evt) => changeLat(evt) } />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input type="text" className="input" value={lon} onChange={(evt) => changeLon(evt) } />
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