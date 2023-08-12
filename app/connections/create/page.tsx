'use client'
import { db, Point } from "@/utils/db"
import { Point as EditPoint } from '../../../components/route/Point' 
import { useRouter } from "next/navigation"
import { useState, useId } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uuidv4 } from 'uuid'

export default function Page(): React.ReactNode {

    const [ name, setName ] = useState<string | null>(null)
    const [ type, setType ] = useState<string>("bus")
    const [ route, setRoute ] = useState<Point[]>([])

    const router = useRouter()

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

    const handleAddItem = async () => {
        await db.table("connections").add({
            name,
            type,
            route
        })

        router.push("/")
    }

    return (
        <div className="columns">
            <div className="column is-two-thirds">
                <form onSubmit={evt => evt.preventDefault()}>
                    <div className="field">
                        <label className="label">Name:</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Bus, tram or train description" onChange={(evt) => setName(evt.target.value) } />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Type:</label>
                        <div className="control">
                            <div className="select">
                                <select onChange={(evt) => setType(evt.target.value) }>
                                    <option>Bus</option>
                                    <option>Tram</option>
                                    <option>Train</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Route:</label>
                        <div className="control">
                            {route.map(point => {
                                return (
                                   <EditPoint key={point.id} point={point} handleChangePoint={handleChangePoint} handleRemovePoint={handleRemovePoint} /> 
                                )
                            })}
                        </div>
                        <div className="control">
                            
                            <button className="button is-small" onClick={() => handleAddPoint()}>
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp; Add point
                            </button>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" onClick={() => handleAddItem() }>Add connection</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light" onClick={() => router.back() }>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="column is-one-third">
                {/* ...todo */}
            </div>
        </div>
    )
}