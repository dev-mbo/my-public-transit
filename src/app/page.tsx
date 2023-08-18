'use client'

import Map from '../components/map/Map'
import {  db } from '../utils/database'
import { default as ConnectionList } from '../components/connection/List'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useLiveQuery } from 'dexie-react-hooks' 
import { useState, useMemo } from 'react' 

export default function Home() {

  const [connections, setConnections] = useState<IConnection[]>([])
  const [visibleId, setVisibleId] = useState<number | null>(connections && connections.length ? connections[0].id : null)

  let data = useLiveQuery<IConnection[]>(() => {
      const data = db.table("connections").toArray();
      data.then(data => {
        if (data.length && visibleId === null) {
          setVisibleId(data[0].id)
        }
        setConnections(data)
      })
      return data || [];
  }, [])

  const handleChangeConnection = (connection: IConnection) => {
    setConnections(connections.map(item => {
      if (item.id === connection.id) {
        return connection
      }
      return item
    }))
  }
  
  const handleSetVisibleId = (id: number) => {
    if (visibleId === id) {
        setVisibleId(null)
    } else {
        setVisibleId(id)
    }
  }

  const visibleConnection = useMemo((): IConnection | null  => {
    let visibleConnection = null;
    if (connections && connections.length) {
      visibleConnection = connections.filter(connection => connection.id === visibleId)[0]
    }
    return visibleConnection
  }, [visibleId])

  const fallbackJsx = <p>
    Loading .. <FontAwesomeIcon icon={faSpinner} spin />
  </p>

  return (
    <main>
      <div className="columns">
        <div className="column is-one-third">
          {data ?
            <ConnectionList 
              connections={connections}
              visibleId={visibleId} 
              handleSetVisibleId={handleSetVisibleId} 
              handleChangeConnection={handleChangeConnection} /> :
            fallbackJsx
          } 
        </div>
        <div className="column is-two-thirds">
          <Map connection={visibleConnection} />
        </div>
      </div>
    </main>
  )
}
