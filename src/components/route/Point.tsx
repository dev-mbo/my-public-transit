import React, { useState } from "react";
import { 
    faTrash, 
    faCircleInfo,
    faLocationDot
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PointProps = {
    point: IPoint, 
    handleRemovePoint: (id: string) => void
    handleChangePoint: (item: IPoint) => void,
}

export function Point({ point, handleChangePoint, handleRemovePoint}: PointProps): React.ReactNode {

    const [address, setAddress] = useState<string>(point.address)
    const [coords, setCoords] = useState<{lat: number, lon: number}>(point.coords)

    const handlePositionClick = () => {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURI(address)}&format=geocodejson&limit=1`;
        fetch(url)
            .then(data => data.json())
            .then(json => {
                try {
                    const coords = json['features'][0]['geometry']['coordinates']
                    setCoords({
                        lon: coords[0],
                        lat: coords[1]
                    })
                    handleChangePoint({
                        id: point.id,
                        address: address,
                        coords: {
                            lon: coords[0],
                            lat: coords[1]
                        }
                    })
                } catch (err) {
                    console.error(json)
                }
            })
    }

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
                <div className="control is-flex is-flex-direction-row">
                    <input type="text" className="input" value={address} onChange={(evt) => changeAddress(evt) } />
                    <button className="button ml-2" data-tooltip="request geo coordinates for address" onClick={handlePositionClick}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </button>
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