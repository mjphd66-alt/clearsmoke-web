'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { colors } from '@/theme/colors'

// 关卡配置
const LEVELS = [
  { level: 1, days: 0, name: '觉醒关', description: '开启戒烟旅程' },
  { level: 2, days: 3, name: '考验关', description: '度过初期戒断' },
  { level: 3, days: 7, name: '周里程碑', description: '一周坚持' },
  { level: 4, days: 14, name: '半月挑战', description: '习惯初步形成' },
  { level: 5, days: 21, name: '习惯关', description: '破除旧习惯' },
  { level: 6, days: 30, name: '月度Boss', description: '完整一个月' },
]

// 精灵进化
const EVOLUTION = [
  { stage: 1, min_days: 0, name: '种子', icon: '🌱' },
  { stage: 2, min_days: 7, name: '小树苗', icon: '🌿' },
  { stage: 3, min_days: 30, name: '大树', icon: '🌳' },
  { stage: 4, min_days: 90, name: '森林守护者', icon: '🌲' },
]

// 成就配置
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

const getDefaultData = (): AppData => ({
  nickname: '戒烟者',
  days: 0,
  energy: 70,
  stage: 1,
  records: [],
  achievements: [],
})

const loadData = (): AppData => {
  if (typeof window === 'undefined') return getDefaultData()
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : getDefaultData()
}

const saveData = (data: AppData) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<AppData>(getDefaultData())

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

  const getNextLevel = () => {
    const current = getCurrentLevel()
    const idx = LEVELS.findIndex(l => l.level === current.level) + 1
    return LEVELS[idx] || null
  }

  const getEvolutionIcon = () => {
    for (let i = EVOLUTION.length - 1; i >= 0; i--) {
      if (data.days >= EVOLUTION[i].min_days) return EVOLUTION[i]
    }
    return EVOLUTION[0]
  }

  const handleCheckin = () => {
    const today = new Date().toISOString().split('T')[0]
    if (data.records.includes(today)) return

    const newData = {
      ...data,
      days: data.days + 1,
      energy: Math.min(100, data.energy + 10),
      records: [today, ...data.records],
    }

    // 检查成就
    ACHIEVEMENTS.forEach(a => {
      if (newData.days >= a.days && !newData.achievements.includes(a.name)) {
        newData.achievements = [...newData.achievements, a.name]
      }
    })

    // 更新进化阶段
    for (let i = EVOLUTION.length - 1; i >= 0; i--) {
      if (newData.days >= EVOLUTION[i].min_days) {
        newData.stage = EVOLUTION[i].stage
        break
      }
    }

    setData(newData)
    saveData(newData)
  }

  const todayChecked = data.records.includes(new Date().toISOString().split('T')[0])

  if (!mounted) return null

  const level = getCurrentLevel()
  const nextLevel = getNextLevel()
  const evolution = getEvolutionIcon()
  const progress = nextLevel ? (data.days - level.days) / (nextLevel.days - level.days) : 1
  const cigarettes = data.days * 20
  const money = cigarettes * 0.5

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16, minHeight: '100vh', background: colors.background, paddingBottom: 80 }}>
      {/* 头部 */}
      <header style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>你好，{data.nickname}</h2>
        <p style={{ fontSize: 16, color: colors.primary, marginTop: 4 }}>已戒烟 {data.days} 天</p>
      </header>

      {/* 精灵 */}
      <div style={{ background: colors.card, borderRadius: 16, padding: 24, marginBottom: 16, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <span style={{ fontSize: 80 }}>{evolution.icon}</span>
        <span style={{ fontSize: 40, marginLeft: 8 }}>{data.energy >= 80 ? '😊' : data.energy >= 50 ? '😐' : '😢'}</span>
        <p style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>{evolution.name}</p>
        <p style={{ fontSize: 14, color: colors.textLight }}>{data.energy >= 80 ? '太棒了！继续保持！' : '加油，我在等你保护我！'}</p>
      </div>

      {/* 能量条 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 14, color: colors.textLight }}>能量值</span>
          <span style={{ fontSize: 14, fontWeight: 'bold', color: data.energy >= 80 ? colors.success : colors.warning }}>{data.energy}/100</span>
        </div>
        <div style={{ height: 8, background: colors.border, borderRadius: 4 }}>
          <div style={{ height: 8, width: `${data.energy}%`, background: colors.primary, borderRadius: 4 }} />
        </div>
      </div>

      {/* 统计 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1, background: colors.card, borderRadius: 12, padding: 16, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: 24 }}>📅</span>
          <p style={{ fontSize: 12, color: colors.textLight, marginTop: 4 }}>戒烟天数</p>
          <p style={{ fontSize: 20, fontWeight: 'bold' }}>{data.days}天</p>
        </div>
        <div style={{ flex: 1, background: colors.card, borderRadius: 12, padding: 16, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: 24 }}>🚬</span>
          <p style={{ fontSize: 12, color: colors.textLight, marginTop: 4 }}>少吸</p>
          <p style={{ fontSize: 20, fontWeight: 'bold' }}>{cigarettes}支</p>
        </div>
        <div style={{ flex: 1, background: colors.card, borderRadius: 12, padding: 16, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: 24 }}>💰</span>
          <p style={{ fontSize: 12, color: colors.textLight, marginTop: 4 }}>省钱</p>
          <p style={{ fontSize: 20, fontWeight: 'bold' }}>{money.toFixed(0)}元</p>
        </div>
      </div>

      {/* 关卡 */}
      <div style={{ background: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>当前关卡</h3>
        <p style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary }}>{level.name}</p>
        <p style={{ fontSize: 14, color: colors.textLight }}>{level.description}</p>
        {nextLevel && (
          <div style={{ marginTop: 12 }}>
            <div style={{ height: 8, background: colors.border, borderRadius: 4 }}>
              <div style={{ height: 8, width: `${progress * 100}%`, background: colors.primary, borderRadius: 4 }} />
            </div>
            <p style={{ fontSize: 12, color: colors.textLight, marginTop: 4 }}>还需 {nextLevel.days - data.days} 天到达 {nextLevel.name}</p>
          </div>
        )}
      </div>

      {/* 打卡按钮 */}
      <button
        onClick={handleCheckin}
        style={{
          width: '100%',
          padding: 24,
          borderRadius: 12,
          background: todayChecked ? colors.textLight : colors.primary,
          color: 'white',
          fontSize: 18,
          fontWeight: 'bold',
          border: 'none',
          cursor: todayChecked ? 'default' : 'pointer',
        }}
      >
        {todayChecked ? '已打卡 ✓' : '今日打卡'}
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