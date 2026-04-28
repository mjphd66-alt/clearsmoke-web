'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/userSlice'
import { userService } from '@/services/localStorage'
import { colors } from '@/theme/colors'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [nickname, setNickname] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // 保存用户信息到本地
    const user = userService.update({ nickname: nickname || '戒烟者' })
    dispatch(setUser(user))
    setIsLoading(false)
    router.push('/home')
  }

  return (
    <main className="container">
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <span style={{ fontSize: 80 }}>🌱</span>
        <h1 style={{ fontSize: 24, marginTop: 16 }}>清烟之旅</h1>
        <p style={{ fontSize: 14, color: colors.textLight, marginTop: 8 }}>开始你的戒烟之旅</p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 32 }}>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 14, color: colors.textLight }}>你的昵称</label>
          <input
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              marginTop: 8,
              borderRadius: 8,
              border: `1px solid ${colors.border}`,
              fontSize: 16,
            }}
            placeholder="请输入昵称（可选）"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
          style={{ width: '100%' }}
        >
          {isLoading ? '进入中...' : '开始戒烟之旅'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 24, color: colors.textLight, fontSize: 12 }}>
        数据保存在本地，无需注册登录
      </p>
    </main>
  )
}