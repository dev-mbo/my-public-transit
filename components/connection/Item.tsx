import { Connection } from '../../utils/db'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ItemProps = {
    connection: Connection,
    handleRemoveItem: (id: number) => void
}
  
export default function Item({ connection, handleRemoveItem }: ItemProps): React.ReactNode {

    return (
        <div className="columns content">
            <div className="column is-two-thirds">
                <h1 className="title is-3">{ connection.name }:</h1>
                <p>Type: {connection.type}</p>
            </div>
            <div className="column is-one-third">
                <button onClick={() => handleRemoveItem(connection.id) }>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}