'use client'

import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'

export default function LatLong() {
  const { current: mapRef } = useMap()
  const [pos, setPos] = useState({ lat: 0, lng: 0 })

  useEffect(() => {
    const map = mapRef?.getMap()
    if (!map) return

    const update = () => {
      const c = map.getCenter()
      setPos({ lat: c.lat, lng: c.lng })
    }

    map.on('move', update)
    update()

    return () => map.off('move', update)
  }, [mapRef])

  return (
    <div className='text-center w-screen text-white'>lat: {pos.lat.toFixed(5)} lng: {pos.lng.toFixed(5)}</div>
  )
}
