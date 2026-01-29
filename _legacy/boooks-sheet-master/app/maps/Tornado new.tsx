import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const BOOK_TEXTURES = [
  'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=200'
]

interface TornadoSystemProps {
  bookCount: number
  height: number
  radius: number
  rotationSpeed: number
}

export function TornadoSystem({
  bookCount,
  height,
  radius,
  rotationSpeed
}: TornadoSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const textures = useTexture(BOOK_TEXTURES)

  const material = useMemo(
    () =>
      textures.map(
        tex =>
          new THREE.MeshBasicMaterial({
            map: tex
          })
      ),
    [textures]
  )

  const data = useMemo(() => {
    return Array.from({ length: bookCount }, (_, i) => {
      const t = i / (bookCount - 1)
      const r = radius * (1 - Math.pow(t, 1.2))
      const angle = t * Math.PI * 16

      return {
        t,
        angle,
        position: new THREE.Vector3(
          r * Math.cos(angle),
          height * (1 - t),
          r * Math.sin(angle)
        ),
        rotationY: Math.atan2(Math.cos(angle), -Math.sin(angle)),
        materialIndex: i % material.length
      }
    })
  }, [bookCount, height, radius, material.length])

  useLayoutEffect(() => {
    data.forEach((item, i) => {
      dummy.position.copy(item.position)
      dummy.rotation.set(0, item.rotationY, item.t * Math.PI * 0.5)
      dummy.scale.setScalar(Math.max(0.4, Math.min(1, 1 - bookCount / 2000)))
      dummy.updateMatrix()

      meshRef.current.setMatrixAt(i, dummy.matrix)
      meshRef.current.setColorAt(i, new THREE.Color('white'))
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  }, [data])

  useFrame((state) => {
    meshRef.current.rotation.y += 0.01 * rotationSpeed
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.05
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, bookCount]}
      material={material}
    >
      <boxGeometry args={[1, 1.5, 0.2]} />
    </instancedMesh>
  )
}
