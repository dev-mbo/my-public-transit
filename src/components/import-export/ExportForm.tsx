import { getConnections } from "@/src/utils/database";
import React, { useEffect, useState } from "react";

export default function ExportForm(): React.ReactNode {

    const [data, setData] = useState<string>("")

    useEffect(() => {
        getConnections()
            .then(data => JSON.stringify(data))
            .then(data => setData(data))
    }, [])

    const downloadJson = (evt: React.FormEvent<HTMLAnchorElement>) => {
        const blob = new Blob([data], { type: 'text/json' })
        const link = evt.currentTarget
        link.download = 'data.json'
        link.href = window.URL.createObjectURL(blob)
    }

    return (
        <div className="export-form">
            <div className="field">
                <label className="label">Json-Output:</label>
                <div className="control">
                    <textarea className="textarea" rows={10} value={data} readOnly></textarea>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <a onClick={evt => downloadJson(evt)}>
                        <button className="button is-link">Export as file</button>
                    </a>
                </div>
            </div>
        </div>
    )
}