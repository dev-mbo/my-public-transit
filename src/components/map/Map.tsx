'use client'
import 'node_modules/ol/ol.css'
import styles from './styles.module.css'
import { useEffect, useRef, useMemo } from "react"
import copy from 'copy-to-clipboard'

import {Map, View} from 'ol'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'

import { LineString } from 'ol/geom'
import Feature from 'ol/Feature'
import Vector from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Style } from 'ol/style'
import { Stroke } from 'ol/style'
import { transform } from 'ol/proj'

import { fromLonLat, toLonLat } from 'ol/proj.js';

type MapProps = {
    connection: IConnection | null
}

export default function MyMap({ connection }: MapProps): React.ReactNode {

    const mapObj = useRef<Map | null>(null)
    const mapDiv = useRef<HTMLDivElement>(null)

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
        
        const map = new Map()
        map.addLayer(new TileLayer({
            source: new OSM()
        }))
        map.setTarget(mapDiv.current!)
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
        mapObj.current = map
        return () => {
            mapObj.current && mapObj.current.setTarget(undefined)
        }

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

        if (mapObj.current) {
            mapObj.current.addLayer(vectorLayer)

            if (connection && connection.route.length) {
                mapObj.current.getView().setCenter(
                    transform(
                        [connection.route[0].coords.lon, connection.route[0].coords.lat], 
                        'EPSG:4326', 'EPSG:3857'
                    )
                )
            }
            mapObj.current.getView().setZoom(12)
        }
        return () => { 
            mapObj.current && mapObj.current.removeLayer(vectorLayer)
        } 

    }, [connection])

    return (
        <div id="mapdiv" ref={mapDiv} className={styles.mapdiv}></div>
    )
}