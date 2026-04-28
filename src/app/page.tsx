'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { colors } from '@/theme/colors'

export default function LandingPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div style={{
      maxWidth: 480,
      margin: '0 auto',
      padding: 16,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.background,
    }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span style={{ fontSize: 100 }}>🌱</span>
        <h1 style={{ fontSize: 32, fontWeight: 'bold', marginTop: 24, color: colors.primary }}>清烟之旅</h1>
        <p style={{ fontSize: 16, color: colors.textLight, marginTop: 8 }}>戒烟精灵养成，守护健康每一天</p>
      </div>

      <button
        onClick={() => router.push('/home')}
        style={{
          padding: 24,
          borderRadius: 12,
          background: colors.primary,
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
          width: 280,
        }}
      >
        开始戒烟之旅
      </button>

      <p style={{ textAlign: 'center', marginTop: 24, color: colors.textLight, fontSize: 12 }}>
        数据保存在本地浏览器
      </p>
    </div>
  )
}