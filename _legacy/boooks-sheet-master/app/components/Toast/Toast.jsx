'use client';
import React from 'react'
import { useToastStore } from './useToastStore'
import './toast.css'

export function Toasts() {
  const { toasts } = useToastStore()

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={`toast px-4 py-2 shadow text-white p-2 rounded-full bg-black/10 backdrop-blur`}
          style={{
            animation: 'fadeInUp 0.3s ease-out',}}
        >
          <div
          className='w-2 h-2 rounded full'
          style={{
            backgroundColor: type === 'error'
              ? '#f8717180'
              : type === 'success'
              ? '#4ade8080'
              : '#37415180',
          }}
          >

          </div>
          {message}
        </div>
      ))}
    </div>
  )
}
