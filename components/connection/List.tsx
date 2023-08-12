import React from "react";
import Item from './Item'
import { db, Connection } from '../../utils/db'
import { useRouter } from 'next/navigation'

export default function List({ connections }: { connections?: Connection[]}): React.ReactNode {

    const router= useRouter()

    const handleRemoveItem = (id: number) => {
        db.table("connections")
            .where("id")
            .equals(id)
            .delete()
            .then((deleteCount) => {
                console.log(`Successfully deleted item with id ${id}`)
            })
    }
    
    return (
        <div className="connections-list">
            <div className="block">
                <ul>
                    {connections?.map(conn => {
                        return (
                            <Item key={conn.id} connection={conn} handleRemoveItem={handleRemoveItem}></Item>
                        )
                    })}
                </ul>
            </div>
            <div className="block">
                <button className="button" onClick={() => router.push('/connections/create') }>
                    Add connection
                </button>
            </div>
        </div>
    )
}