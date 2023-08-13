'use client'
import 'node_modules/ol/ol.css'
import styles from './styles.module.css'
import { useEffect, useRef } from "react"
import { Connection } from '../../utils/db'
import copy from 'copy-to-clipboard'

import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'

import { LineString } from 'ol/geom'
import Feature from 'ol/Feature'
import Vector from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Style } from 'ol/style'
import { Stroke } from 'ol/style'
import { transform } from 'ol/proj'

import { fromLonLat, toLonLat } from 'ol/proj.js';

type MapProps = {
    connection: Connection | null
}

const map = new Map();

export default function MyMap({ connection }: MapProps): React.ReactNode {

    const mapRef = useRef<HTMLDivElement>(null)

    const getLineStringFromConnection = () => {
        if (!connection) {
            return []
        }
        return connection.route.map(point => {
            return [
                point.coords.lon,
                point.coords.lat
            ]
        })
    }

    useEffect(() => {
        if (mapRef.current) {
            
            map.addLayer(new TileLayer({
                source: new OSM()
            }))
            map.setTarget(mapRef.current)
            map.setView(new View({
                center: [0, 0], 
                zoom: 2
            }))

            map.on('click', (evt) => {
                console.log(evt.coordinate)

                const lonLat = toLonLat(evt.coordinate);
                console.log(lonLat)

                copy(lonLat.toString())
            })
        }
        return () => map.setTarget(undefined)

    }, [])

    useEffect(() => {
        const path = getLineStringFromConnection()

        const lineString = new LineString(path);
        lineString.transform('EPSG:4326', 'EPSG:3857');

        const feature = new Feature({
            geometry: lineString
        });

        const source = new Vector({
            features: [
                feature
            ]
        });

        const vectorLayer = new VectorLayer({
            source,
            style: new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 3
                })
            })
        })

        map.addLayer(vectorLayer)

        if (connection && connection.route.length) {
            map.getView().setCenter(
                transform(
                    [connection.route[0].coords.lon, connection.route[0].coords.lat], 
                    'EPSG:4326', 'EPSG:3857'
                )
            )
        }
        map.getView().setZoom(12)
    
        return () => { 
            map.removeLayer(vectorLayer)
        } 

    }, [connection])

    return (
        <div id="mapdiv" ref={mapRef} className={styles.mapdiv}></div>
    )
}