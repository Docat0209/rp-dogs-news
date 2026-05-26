'use client'

import { useState, useEffect } from 'react'

export default function ClockWidget() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  const dateLine = time.toLocaleDateString('zh-TW', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const timeLine = time.toLocaleTimeString('zh-TW', {
    timeZone: 'Asia/Taipei',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return (
    <div className="hidden md:flex flex-col items-end leading-tight">
      <span className="text-[10px] text-gray-400 tracking-wide">{dateLine}</span>
      <span className="text-sm font-mono font-semibold text-[#1A1A1A] tabular-nums">{timeLine}</span>
    </div>
  )
}
