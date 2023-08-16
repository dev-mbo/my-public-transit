'use client'
import 'node_modules/ol/ol.css'
import styles from './styles.module.css'
import { useEffect, useRef, useState } from "react"
import copy from 'copy-to-clipboard'

import {Map, View, Overlay} from 'ol'
import OSM from 'ol/source/OSM'
import { LineString, Point } from 'ol/geom'
import Feature from 'ol/Feature'
import Vector from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import TileLayer from 'ol/layer/Tile'
import { Style, Stroke, Circle, Fill } from 'ol/style'
import { transform, fromLonLat, toLonLat } from 'ol/proj'

type MapProps = {
    connection: IConnection | null
}

export default function MyMap({ connection }: MapProps): React.ReactNode {

    const mapObj = useRef<Map | null>(null)
    const mapDiv = useRef<HTMLDivElement>(null)
    const overlayObj = useRef<Overlay | null>(null)
    const popupDiv = useRef<HTMLDivElement>(null)

    const [overlayDescription, setOverlayDescription] = useState<string>("")

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

        const overlay = new Overlay({
            element: popupDiv.current!,
            autoPan: {
                animation: {
                    duration: 250
                }
            }
        })
        overlayObj.current = overlay
        map.addOverlay(overlay)

        map.on('click', evt => {
            console.log(evt.coordinate)

            const lonLat = toLonLat(evt.coordinate);
            console.log(lonLat)

            copy(lonLat.toString())

        })
        map.on('pointermove', evt => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, feature => feature);
            
            if (overlayObj.current) {
                overlayObj.current.setPosition(undefined)
            }

            if (feature && feature.get('type') === 'marker') {
                const coordinate = evt.coordinate
                setOverlayDescription(feature.get('description'))
                if (overlayObj.current) {
                    overlayObj.current.setPosition(coordinate)
                }
            }
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
            type: 'route',
            geometry: lineString
        });

        let markers: Feature[] = []
        if (connection) {
            markers = connection.route.map(point => {
                return new Feature({
                    type: 'marker',
                    description: point.address,
                    geometry: new Point(fromLonLat([point.coords.lon, point.coords.lat])),
                })
            })
        }
        const source = new Vector({
            features: [
                feature,
                ...markers
            ] as Feature[]
        });
        const styles: Object = {
            route: new Style({
                stroke: new Stroke({
                    color: [255, 0, 0, 0.8],
                    width: 3
                })
            }),
            marker: new Style({
                image: new Circle({
                    radius: 4,
                    fill: new Fill({'color': 'red'}),
                    stroke: new Stroke({
                        color: 'white',
                        width: 2
                    })
                })
            })
        }
        const vectorLayer = new VectorLayer({
            source,
            style: (feature: any) => (styles as any)[feature.get('type')]
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
        <>
            <div id="mapdiv" ref={mapDiv} className={styles.mapdiv}></div>
            <div ref={popupDiv} className="tag is-info">{overlayDescription}</div>
        </>
    )
}