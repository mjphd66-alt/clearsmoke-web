'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { colors } from '@/theme/colors'

const ACHIEVEMENTS = [
  { days: 1, name: '觉醒勋章', level: 'bronze', icon: '🥉' },
  { days: 7, name: '坚持勋章', level: 'bronze', icon: '🥉' },
  { days: 30, name: '勇士勋章', level: 'silver', icon: '🥈' },
  { days: 100, name: '大师勋章', level: 'gold', icon: '🥇' },
  { days: 365, name: '传奇勋章', level: 'diamond', icon: '💎' },
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

const levelColors: Record<string, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  diamond: '#B9F2FF',
}

export default function AchievementPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [achievements, setAchievements] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    setAchievements(loadData().achievements)
  }, [])

  if (!mounted) return null

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16, minHeight: '100vh', background: colors.background, paddingBottom: 80 }}>
      <header style={{ marginTop: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>成就殿堂</h2>
        <p style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>已解锁 {achievements.length} / {ACHIEVEMENTS.length} 个成就</p>
      </header>

      {/* 成就列表 */}
      <div style={{ background: colors.card, borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {ACHIEVEMENTS.map((a, i) => {
          const unlocked = achievements.includes(a.name)
          return (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              padding: 12,
              marginBottom: 8,
              borderRadius: 8,
              background: unlocked ? `${levelColors[a.level]}20` : colors.background,
              border: unlocked ? `2px solid ${levelColors[a.level]}` : 'none',
            }}>
              <span style={{ fontSize: 32 }}>{unlocked ? a.icon : '🔒'}</span>
              <div style={{ marginLeft: 12 }}>
                <p style={{ fontWeight: 'bold', color: unlocked ? levelColors[a.level] : colors.textLight }}>{a.name}</p>
                <p style={{ fontSize: 12, color: colors.textLight }}>{unlocked ? '已解锁' : `${a.days}天后解锁`}</p>
              </div>
              {unlocked && <span style={{ marginLeft: 'auto', fontSize: 20 }}>✓</span>}
            </div>
          )
        })}
      </div>

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