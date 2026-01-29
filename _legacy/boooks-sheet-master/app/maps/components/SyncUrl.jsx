'use client'

import { useEffect } from 'react'
import { useMap } from 'react-map-gl/maplibre'
import { useRouter, usePathname } from 'next/navigation'

export default function SyncUrl() {
  const { current: mapRef } = useMap()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const map = mapRef?.getMap()
    if (!map) return

    let timeout

    const updateUrl = () => {
      const c = map.getCenter()
      const z = map.getZoom()

      const lat = c.lat.toFixed(5)
      const lng = c.lng.toFixed(5)
      const zoom = z.toFixed(2)

      const url = `${pathname}?lat=${lat}&lng=${lng}&z=${zoom}`

      // Replace = no history spam
      router.replace(url, { scroll: false })
    }

    const onMoveEnd = () => {
      clearTimeout(timeout)
      timeout = setTimeout(updateUrl, 150)
    }

    map.on('moveend', onMoveEnd)

    return () => {
      map.off('moveend', onMoveEnd)
      clearTimeout(timeout)
    }
  }, [mapRef, router, pathname])

  return null
}
