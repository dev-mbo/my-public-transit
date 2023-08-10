import React from "react";
import Item, { Connection } from './Item'

export default function List({ connections }: { connections?: Connection[] }): React.ReactNode {

    const handleClick = () => {

    }
    
    return (
        <>
        <ul>
            {connections?.map(conn => {
                return (
                    <Item key={conn.id} {...conn}></Item>
                )
            })}
        </ul>
        
        <button className="button" onClick={handleClick}>Add connection</button>
        </>
    )
}