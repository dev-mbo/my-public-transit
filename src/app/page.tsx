'use client'

import Map from '../components/map/Map'
import {  db } from '../utils/db'
import { default as ConnectionList } from '../components/connection/List'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useLiveQuery } from 'dexie-react-hooks' 
import { useState } from 'react' 


export default function Home() {

  const connections = useLiveQuery<IConnection[]>(() => {
      const connections = db.table("connections").toArray();
      connections.then(connections => {
        if (connections.length && visibleId === null) {
          setVisibleId(connections[0].id)
        }
      })
      return connections || [];
  }, [])

  const [visibleId, setVisibleId] = useState<number | null>(connections && connections.length ? connections[0].id : null)

  const getVisibleConnection = () => {
    let visibleConnection = null;
    if (connections && connections.length)
      visibleConnection = connections.filter(connection => connection.id === visibleId)[0]
    return visibleConnection
  }
  

  const handleSetVisibleId = (id: number) => {
      if (visibleId === id) {
          setVisibleId(null)
      } else {
          setVisibleId(id)
      }
  }

  const fallbackJsx = <p>
    Loading .. <FontAwesomeIcon icon={faSpinner} spin />
  </p>

  return (
    <main>
      <div className="columns">
        <div className="column is-one-third">
          {connections ?
            <ConnectionList connections={connections} visibleId={visibleId} handleSetVisibleId={handleSetVisibleId} /> :
            fallbackJsx
          } 
        </div>
        <div className="column is-two-thirds">
          <Map connection={getVisibleConnection()} />
        </div>
      </div>
    </main>
  )
}
