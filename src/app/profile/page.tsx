'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { colors } from '@/theme/colors'

const LEVELS = [
  { level: 1, days: 0, name: '觉醒关' },
  { level: 2, days: 3, name: '考验关' },
  { level: 3, days: 7, name: '周里程碑' },
  { level: 4, days: 14, name: '半月挑战' },
  { level: 5, days: 21, name: '习惯关' },
  { level: 6, days: 30, name: '月度Boss' },
]

const EVOLUTION = [
  { stage: 1, name: '种子', icon: '🌱' },
  { stage: 2, name: '小树苗', icon: '🌿' },
  { stage: 3, name: '大树', icon: '🌳' },
  { stage: 4, name: '森林守护者', icon: '🌲' },
]

const STORAGE_KEY = 'clearsmoke_data'

type AppData = {
  nickname: string
  days: number
  energy: number
  stage: number
  records: string[]
  achievements: string[]
}

const loadData = (): AppData => {
  if (typeof window === 'undefined') return { nickname: '', days: 0, energy: 70, stage: 1, records: [], achievements: [] }
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : { nickname: '', days: 0, energy: 70, stage: 1, records: [], achievements: [] }
}

export default function ProfilePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<AppData>({ nickname: '', days: 0, energy: 70, stage: 1, records: [], achievements: [] })

  useEffect(() => {
    setMounted(true)
    setData(loadData())
  }, [])

  const getCurrentLevel = () => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (data.days >= LEVELS[i].days) return LEVELS[i]
    }
    return LEVELS[0]
  }

  const handleClear = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
      router.push('/')
    }
  }

  if (!mounted) return null

  const level = getCurrentLevel()
  const evolution = EVOLUTION.find(e => e.stage === data.stage) || EVOLUTION[0]

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16, minHeight: '100vh', background: colors.background, paddingBottom: 80 }}>
      {/* 头部 */}
      <header style={{ textAlign: 'center', marginTop: 24, marginBottom: 24 }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}>
          <span style={{ fontSize: 40 }}>{evolution.icon}</span>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', marginTop: 16, color: colors.text }}>{data.nickname || '戒烟者'}</h2>
      </header>

      {/* 戒烟进度 */}
      <div style={{ background: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>戒烟进度</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: colors.textLight }}>当前关卡</span>
          <span style={{ fontWeight: 'bold', color: colors.primary }}>{level.name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: colors.textLight }}>戒烟天数</span>
          <span style={{ fontWeight: 'bold' }}>{data.days} 天</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: colors.textLight }}>精灵能量</span>
          <span style={{ fontWeight: 'bold', color: data.energy >= 80 ? colors.success : colors.warning }}>{data.energy}/100</span>
        </div>
      </div>

      {/* 健康恢复 */}
      <div style={{ background: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>健康恢复时间</h3>
        <div style={{ fontSize: 14, color: colors.textLight, lineHeight: 1.6 }}>
          <p>• 20分钟：心率和血压开始下降</p>
          <p>• 12小时：血中一氧化碳水平恢复正常</p>
          <p>• 2周：循环改善，肺功能增强</p>
          <p>• 1个月：咳嗽和呼吸短促减少</p>
          <p>• 1年：心脏病风险减半</p>
        </div>
      </div>

      {/* 清除数据 */}
      <button
        onClick={handleClear}
        style={{
          width: '100%',
          padding: 16,
          borderRadius: 12,
          background: colors.background,
          border: `1px solid ${colors.border}`,
          color: colors.textLight,
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        清除所有数据
      </button>

      {/* 底部导航 */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.card,
        display: 'flex',
        justifyContent: 'space-around',
        padding: 8,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
      }}>
        {[{ path: '/home', icon: '🏠', label: '首页' }, { path: '/achievement', icon: '🏆', label: '成就' }, { path: '/profile', icon: '👤', label: '我的' }].map(tab => (
          <button key={tab.path} onClick={() => router.push(tab.path)} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', color: colors.primary }}>
            <span style={{ fontSize: 24 }}>{tab.icon}</span>
            <p style={{ fontSize: 12 }}>{tab.label}</p>
          </button>
        ))}
      </nav>
    </div>
  )
}