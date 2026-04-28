'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/userSlice'
import { setSpirit } from '@/store/slices/spiritSlice'
import { userService, spiritService } from '@/services/localStorage'
import { colors } from '@/theme/colors'

export default function HomePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // 加载本地数据
    const user = userService.get()
    const spirit = spiritService.get()
    dispatch(setUser(user))
    dispatch(setSpirit(spirit))
    setIsReady(true)
    // 已有数据则跳转首页
    if (user.nickname) {
      router.replace('/home')
    }
  }, [dispatch, router])

  if (!isReady) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.background,
      }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 80, animation: 'pulse 1s infinite' }}>🌱</span>
          <p style={{ fontSize: 24, fontWeight: 'bold', marginTop: 16, color: colors.primary }}>清烟之旅</p>
        </div>
      </div>
    )
  }

  return (
    <main className="container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span style={{ fontSize: 100 }}>🌱</span>
        <h1 style={{ fontSize: 32, fontWeight: 'bold', marginTop: 24, color: colors.primary }}>清烟之旅</h1>
        <p style={{ fontSize: 16, color: colors.textLight, marginTop: 8 }}>戒烟精灵养成，守护健康每一天</p>
      </div>

      <button
        className="btn btn-primary"
        style={{ width: 280 }}
        onClick={() => router.push('/login')}
      >
        开始戒烟之旅
      </button>

      <p style={{ textAlign: 'center', marginTop: 24, color: colors.textLight, fontSize: 12 }}>
        数据保存在本地，无需注册登录
      </p>
    </main>
  )
}