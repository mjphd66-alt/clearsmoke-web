'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setUser } from '@/store/slices/userSlice'
import { setSpirit, updateEnergy } from '@/store/slices/spiritSlice'
import { setTodayRecord, setTotalDays, setCigarettesAvoided, setMoneySaved, updateTodayTasks } from '@/store/slices/quitSlice'
import { setAchievements } from '@/store/slices/achievementSlice'
import { userService, spiritService, recordService, achievementService, getCurrentLevel, getNextLevel } from '@/services/localStorage'
import { SpiritDisplay } from '@/components/SpiritDisplay'
import { EnergyBar } from '@/components/EnergyBar'
import { StatCard } from '@/components/StatCard'
import { BottomNav } from '@/components/BottomNav'
import { colors } from '@/theme/colors'
import { LEVELS } from '@/utils/constants'

export default function HomePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)
  const { spirit } = useSelector((state: RootState) => state.spirit)
  const { todayRecord, totalDays, cigarettesAvoided, moneySaved } = useSelector((state: RootState) => state.quit)
  const { achievements } = useSelector((state: RootState) => state.achievement)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setIsLoading(true)
    // 加载用户
    const u = userService.get()
    dispatch(setUser(u))
    // 加载精灵
    const s = spiritService.get()
    spiritService.updateEvolution(totalDays || 7)
    dispatch(setSpirit(s))
    // 加载统计
    const stats = recordService.getStats()
    dispatch(setTotalDays(stats.totalDays))
    dispatch(setCigarettesAvoided(stats.cigarettesAvoided))
    dispatch(setMoneySaved(stats.moneySaved))
    // 加载今日记录
    const today = recordService.getToday()
    dispatch(setTodayRecord(today))
    // 加载成就
    const achs = achievementService.getAll()
    dispatch(setAchievements(achs))
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: colors.background }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 60, animation: 'pulse 1s infinite' }}>🌱</span>
          <p style={{ marginTop: 16, color: colors.textLight }}>加载中...</p>
        </div>
      </div>
    )
  }

  const currentLevel = getCurrentLevel(totalDays)
  const nextLevel = getNextLevel(totalDays)
  const progressToNext = nextLevel ? (totalDays - currentLevel.days) / (nextLevel.days - currentLevel.days) : 1

  return (
    <main className="container" style={{ paddingBottom: 80 }}>
      <header style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>你好，{user?.nickname || '戒烟者'}</h2>
        <p style={{ fontSize: 16, color: colors.primary, marginTop: 4 }}>已戒烟 {totalDays} 天</p>
      </header>

      <SpiritDisplay spirit={spirit} days={totalDays} onPress={() => router.push('/profile')} />
      {spirit && <EnergyBar energy={spirit.energy} maxEnergy={100} />}

      <div style={{ display: 'flex', gap: 12, marginVertical: 16 }}>
        <StatCard icon="📅" label="戒烟天数" value={String(totalDays)} unit="天" />
        <StatCard icon="🚬" label="少吸" value={String(cigarettesAvoided)} unit="支" />
        <StatCard icon="💰" label="省钱" value={String(moneySaved.toFixed(0))} unit="元" />
      </div>

      <div className="card" style={{ marginVertical: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>当前关卡</h3>
        <p style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary }}>{currentLevel.name}</p>
        <p style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>{currentLevel.description}</p>
        {nextLevel && (
          <div style={{ marginTop: 12 }}>
            <div style={{ height: 8, background: colors.border, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressToNext * 100}%`, background: colors.primary, borderRadius: 4 }} />
            </div>
            <p style={{ fontSize: 12, color: colors.textLight, marginTop: 4 }}>
              还需 {nextLevel.days - totalDays} 天到达 {nextLevel.name}
            </p>
          </div>
        )}
      </div>

      <button
        className="btn btn-primary"
        style={{ width: '100%', marginTop: 24 }}
        onClick={() => router.push('/checkin')}
      >
        {todayRecord?.tasks_completed?.checkin ? '已打卡 ✓' : '今日打卡'}
      </button>

      {!todayRecord?.tasks_completed?.checkin && (
        <p style={{ textAlign: 'center', marginTop: 16, color: colors.secondary, fontSize: 14 }}>
          别忘了今天打卡，保护你的精灵哦！
        </p>
      )}

      <BottomNav />
    </main>
  )
}