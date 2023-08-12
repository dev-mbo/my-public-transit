import { Connection } from '../../utils/db'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ItemProps = {
    connection: Connection,
    handleRemoveItem: (id: number) => void
}
  
export default function Item({ connection, handleRemoveItem }: ItemProps): React.ReactNode {

    return (
        <div className="columns content">
            <div className="column is-two-thirds">
                <dl>
                    <dt>
                        <strong>
                            { connection.name }
                        </strong>
                    </dt>
                    <dd>
                        { connection.type }, { connection.route.length } points
                    </dd>
                </dl>
            </div>
            <div className="column is-one-third">
                <button className="button is-small mr-1" onClick={() => null }>
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button className="button is-small" onClick={() => handleRemoveItem(connection.id) }>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}