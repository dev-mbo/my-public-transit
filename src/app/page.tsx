'use client'

import Map from '../components/map/Map'
import TabList from '../components/tabs/TabList'
import ImportForm from '../components/import-export/ImportForm'
import ExportForm from '../components/import-export/ExportForm'
import { getConnections } from '../utils/database'
import { default as ConnectionList } from '../components/connection/List'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useLiveQuery } from 'dexie-react-hooks' 
import { useEffect, useState } from 'react' 

export default function Home() {

  const [connections, setConnections] = useState<IConnection[]>([])
  const [visibleId, setVisibleId] = useState<number | null>(null)

  const [tab, setTab] = useState<"list" | "import" | "export">("list")

  const data = useLiveQuery<IConnection[]>(() => {
      const data = getConnections() 
      data.then(data => {
        setConnections(data)
      })
      return data || [];
  }, [])

  useEffect(() => {
    if (connections.length && visibleId === null) {
      setVisibleId(connections[0].id)
    }
  }, [connections])

  const handleChangeConnection = (connection: IConnection) => {
    setConnections(connections.map(item => {
      if (item.id === connection.id) {
        return connection
      }
      return item
    }))
  }
  
  const handleSetVisibleId = (id: number, editMode: boolean = false) => {
    if (visibleId === id && !editMode) {
        setVisibleId(null)
    } else {
        setVisibleId(id)
    }
  }

  const getVisibleConnection = (): IConnection | null  => {
    let visibleConnection = null;
    if (connections && connections.length) {
      visibleConnection = connections.filter(connection => connection.id === visibleId)[0]
    }
    return visibleConnection
  }

  const fallbackJsx = <p>
    Loading .. <FontAwesomeIcon icon={faSpinner} spin />
  </p>

  return (
    <main>
      <div className="columns">
        <div className="column is-one-third">
          <TabList tab={tab} onClickHandler={setTab}/>  
          {tab === "list" &&
            (
              data ?
                <ConnectionList 
                  connections={connections}
                  visibleId={visibleId} 
                  handleSetVisibleId={handleSetVisibleId} 
                  handleChangeConnection={handleChangeConnection} /> :
                fallbackJsx 
            )
          }
          {tab === "import" &&  
            <ImportForm />
          }
          {tab === "export" && 
            <ExportForm />
          }
        </div>
        <div className="column is-two-thirds">
          <Map connection={getVisibleConnection()} />
        </div>
      </div>
    </main>
  )
}
