import { addConnection } from "@/src/utils/database";
import React, { useState } from "react";

export default function ExportForm(): React.ReactNode {

    const [data, setData] = useState<string>("")

    const importJson = () => {
        try {
            const connections: IConnection[] = JSON.parse(data)
            for (let connection of connections) {
                addConnection(connection)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="import-form">
            <div className="field">
                <label className="label">Json-Input:</label>
                <div className="control">
                    <textarea className="textarea" rows={10} onChange={evt => setData(evt.currentTarget.value)}></textarea>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-link" onClick={() => importJson()}>Import</button>
                </div>
            </div>
        </div>
    )
}