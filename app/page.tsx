'use client'

import Map from '../components/map/Map'
import { Connection, Point, db } from '../utils/db'
import { default as ConnectionList } from '../components/connection/List'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useLiveQuery } from 'dexie-react-hooks' 


export default function Home() {

  const connections = useLiveQuery<Connection[]>(() => {
      const connections = db.table("connections").toArray();
      return connections || [];
  }, [])

  const fallbackJsx = <p>
    Loading .. <FontAwesomeIcon icon={faSpinner} spin />
  </p>

  return (
    <main>
      <div className="columns">
        <div className="column is-one-third">
          {connections ?
            <ConnectionList connections={connections} /> :
            fallbackJsx
          }
        </div>
        <div className="column is-two-thirds">
          <Map />
        </div>
      </div>
    </main>
  )
}
