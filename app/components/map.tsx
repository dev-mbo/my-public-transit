'use client'
import 'node_modules/ol/ol.css'
import styles from './styles.module.css'
import { useEffect } from "react"
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'

export default function MyMap(): React.ReactNode {

    useEffect(() => {
        console.log("hello")
        const map = new Map({
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
            ],
            target: 'mapdiv',
            view: new View({
              center: [0, 0],
              zoom: 2,
            }),
          });
    }, [])

    return (
        <>    
            <div id="mapdiv" className={styles.mapdiv}>
            </div>
        </>
    )
}