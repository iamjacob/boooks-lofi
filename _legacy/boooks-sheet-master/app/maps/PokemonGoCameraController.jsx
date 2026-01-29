import { useEffect } from 'react'
import { useMap } from 'react-map-gl/maplibre'

export function PokemonGoCameraController() {
  const { current: mapRef } = useMap()

  useEffect(() => {
    const map = mapRef?.getMap()
    if (!map) return

    const minZoom = 10
    const maxZoom = 20
    const minPitch = 0
    const maxPitch = 75

    const handleZoom = () => {
      const zoom = Math.max(
        minZoom,
        Math.min(maxZoom, map.getZoom())
      )

      const t = (zoom - minZoom) / (maxZoom - minZoom)

      // Pokémon GO S-curve
      const ease =
        t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2

      const targetPitch =
        minPitch + (maxPitch - minPitch) * ease

      const currentPitch = map.getPitch()

      // 🚨 CRITICAL GUARD (prevents recursion)
      if (Math.abs(currentPitch - targetPitch) > 0.1) {
        map.setPitch(targetPitch)
      }
    }

    map.on('zoom', handleZoom)
    handleZoom() // initial sync

    return () => {
      map.off('zoom', handleZoom)
    }
  }, [mapRef])

  return null
}
