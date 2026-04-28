'use client'

import { useRouter } from 'next/navigation'
import { colors } from '@/theme/colors'

export default function RegisterPage() {
  const router = useRouter()

  // 本地存储模式不需要注册，直接跳转登录页
  return (
    <main className="container">
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <span style={{ fontSize: 80 }}>🌱</span>
        <h1 style={{ fontSize: 24, marginTop: 16 }}>无需注册</h1>
        <p style={{ fontSize: 16, color: colors.textLight, marginTop: 8 }}>数据保存在你的浏览器本地</p>
      </div>

      <button
        className="btn btn-primary"
        style={{ width: '100%', marginTop: 32 }}
        onClick={() => router.push('/login')}
      >
        开始使用
      </button>

      <p style={{ textAlign: 'center', marginTop: 24, color: colors.textLight, fontSize: 12 }}>
        本地存储模式，数据仅保存在当前设备
      </p>
    </main>
  )
}