'use client'

import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'

export default function Live() {
  const { current: mapRef } = useMap()
  const [state, setState] = useState({ zoom: 0, pitch: 0 })

  useEffect(() => {
    const map = mapRef?.getMap()
    if (!map) return

    const update = () => {
      setState({
        zoom: map.getZoom(),
        pitch: map.getPitch(),
      })
    }

    map.on('zoom', update)
    update()

    return () => map.off('zoom', update)
  }, [mapRef])

  return (
    <div className="ui-panel">
      <div>Zoom: {state.zoom.toFixed(2)}</div>
      <div>Pitch: {state.pitch.toFixed(1)}°</div>
    </div>
  )
}
