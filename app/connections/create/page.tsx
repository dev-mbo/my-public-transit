'use client'
import { db } from "@/utils/db"
import { useRouter } from "next/navigation"
import { useState} from 'react'

export default function Page(): React.ReactNode {

    const [ name, setName ] = useState<string | null>(null)
    const [ type, setType ] = useState<string>("bus")

    const router = useRouter()

    const handleAddItem = async () => {
        await db.table("connections").add({
            name,
            type,
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