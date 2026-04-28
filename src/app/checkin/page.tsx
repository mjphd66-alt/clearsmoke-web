'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setSpirit, updateEnergy } from '@/store/slices/spiritSlice'
import { setTodayRecord, updateTodayTasks, setTotalDays, setCigarettesAvoided, setMoneySaved } from '@/store/slices/quitSlice'
import { setAchievements } from '@/store/slices/achievementSlice'
import { spiritService, recordService, achievementService } from '@/services/localStorage'
import { colors } from '@/theme/colors'
import { ENERGY_CONFIG } from '@/utils/constants'
import { BottomNav } from '@/components/BottomNav'

export default function CheckInPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { spirit } = useSelector((state: RootState) => state.spirit)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleCheckIn = () => {
    setIsLoading(true)
    // 创建打卡记录
    const record = recordService.createCheckin()
    dispatch(setTodayRecord(record))
    dispatch(updateTodayTasks({ checkin: true }))
    // 更新精灵能量
    const updatedSpirit = spiritService.updateEnergy(ENERGY_CONFIG.daily_gain)
    dispatch(setSpirit(updatedSpirit))
    dispatch(updateEnergy(ENERGY_CONFIG.daily_gain))
    // 更新统计
    const stats = recordService.getStats()
    dispatch(setTotalDays(stats.totalDays))
    dispatch(setCigarettesAvoided(stats.cigarettesAvoided))
    dispatch(setMoneySaved(stats.moneySaved))
    // 检查成就
    const unlocked = achievementService.checkAndUnlock(stats.totalDays)
    dispatch(setAchievements(achievementService.getAll()))
    setIsSuccess(true)
    setIsLoading(false)
  }

  if (isSuccess) {
    return (
      <main className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
        <span style={{ fontSize: 120 }}>🎉</span>
        <h2 style={{ fontSize: 32, fontWeight: 'bold', color: colors.primary, marginTop: 24 }}>打卡成功！</h2>
        <p style={{ fontSize: 18, color: colors.text, marginTop: 16 }}>你的精灵获得了能量 +{ENERGY_CONFIG.daily_gain}</p>
        <p style={{ fontSize: 16, color: colors.textLight, marginTop: 8 }}>已坚持 {recordService.getStats().totalDays} 天</p>
        <button
          className="btn btn-primary"
          style={{ marginTop: 32 }}
          onClick={() => router.push('/home')}
        >
          返回首页
        </button>
        <BottomNav />
      </main>
    )
  }

  return (
    <main className="container" style={{ paddingBottom: 80 }}>
      <header style={{ textAlign: 'center', marginTop: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 'bold', color: colors.text }}>今日打卡</h2>
        <p style={{ fontSize: 16, color: colors.textLight, marginTop: 8 }}>坚持不吸烟，保护你的精灵</p>
      </header>

      <div style={{ textAlign: 'center', marginVertical: 32 }}>
        <span style={{ fontSize: 100 }}>{spirit?.type === 'tree' ? '🌱' : '🥚'}</span>
        <p style={{ fontSize: 14, color: colors.primary, marginTop: 8 }}>点击打卡为精灵充能</p>
      </div>

      <button
        className="btn btn-primary animate-pulse"
        style={{
          width: 150,
          height: 150,
          borderRadius: '50%',
          margin: '0 auto',
          display: 'flex',
        }}
        disabled={isLoading}
        onClick={handleCheckIn}
      >
        {isLoading ? '...' : '打卡'}
      </button>

      <div className="card" style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>打卡奖励</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <span style={{ marginLeft: 8 }}>精灵能量 +{ENERGY_CONFIG.daily_gain}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>📊</span>
          <span style={{ marginLeft: 8 }}>戒烟天数 +1</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 24 }}>🏆</span>
          <span style={{ marginLeft: 8 }}>解锁成就进度</span>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}