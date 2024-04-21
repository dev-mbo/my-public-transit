const allPoints = []
            for (let path of paths) {
                for (let point of path) {
                    allPoints.push(point)
                }
            }
            // calculate avg lonLat and set center of map
            const avgLat = allPoints.reduce((acc, point) => acc + point[1], 0) / allPoints.length
            const avgLon = allPoints.reduce((acc, point) => acc + point[0], 0) / allPoints.length
            for (let vectorLayer of vectorLayers) {
                mapObj.current.addLayer(vectorLayer)
            }
