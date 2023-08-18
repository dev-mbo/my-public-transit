import React from "react";
import { 
    faTrash, 
    faCircleInfo,
    faLocationDot,
    faArrowUp,
    faArrowDown
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PointProps = {
    point: IPoint, 
    isLast: boolean,
    handleRemovePoint: (id: string) => void,
    handleChangePoint: (point: IPoint) => void
}

export function Point({ point, isLast, handleChangePoint, handleRemovePoint}: PointProps): React.ReactNode {

    const handlePositionClick = () => {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURI(point.address)}&format=geocodejson&limit=1`;
        fetch(url)
            .then(data => data.json())
            .then(json => {
                try {
                    const coords = json['features'][0]['geometry']['coordinates']

                    handleChangePoint({
                        ...point,
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

    
    const changePosition = (value: number) => {
        handleChangePoint({
            ...point,
            position: value
        })
    }

    const changeAddress = (value: string) => {
        handleChangePoint({
            ...point,
            address: value
        })
    }

    const changeCoord = (value: string) => {
        const lonLat = value.split(",")
        const coords = {
            lon: Number.parseFloat(lonLat[0]),
            lat: Number.parseFloat(lonLat[1])
        } 
        
        handleChangePoint({
            ...point,
            coords: coords
        })
    }


    return (
        <div className="block">
            <div className="field">
                <div className="label">Address:</div>
                <div className="control is-flex is-flex-direction-row">
                    <input type="text" className="input" value={point.address} onChange={(evt) => changeAddress(evt.currentTarget.value) } />
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
                <div className="field">
                    <div className="control">
                        <input type="text" className="input" value={point.coords.lon + "," + point.coords.lat} onChange={evt => changeCoord(evt.currentTarget.value) } />
                    </div>
                </div>
            </div>
            <div className="field">
                <button className="button is-small mr-2" onClick={() => handleRemovePoint(point.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                {point.position > 0 &&
                    <button className="button is-small mr-2" onClick={() => changePosition(point.position - 1)}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                }
                {!isLast &&
                    <button className="button is-small mr-2" onClick={() => changePosition(point.position + 1)}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                }
            </div>
        </div>
            
    )
}