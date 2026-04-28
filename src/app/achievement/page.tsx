'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { setAchievements } from '@/store/slices/achievementSlice'
import { achievementService, getCurrentLevel } from '@/services/localStorage'
import { colors } from '@/theme/colors'
import { BottomNav } from '@/components/BottomNav'
import { ACHIEVEMENT_DEFINITIONS } from '@/utils/constants'

const levelColors: Record<string, string> = {
  bronze: colors.bronze,
  silver: colors.silver,
  gold: colors.gold,
  diamond: colors.diamond,
}

export default function AchievementPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { achievements } = useSelector((state: RootState) => state.achievement)
  const { totalDays } = useSelector((state: RootState) => state.quit)

  useEffect(() => {
    const achs = achievementService.getAll()
    dispatch(setAchievements(achs))
  }, [dispatch])

  const allAchievements = ACHIEVEMENT_DEFINITIONS.duration.map(a => ({
    ...a,
    unlocked: achievements.some(ua => ua.achievement_name === a.name),
  }))

  return (
    <main className="container" style={{ paddingBottom: 80 }}>
      <header style={{ marginTop: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>成就殿堂</h2>
        <p style={{ fontSize: 14, color: colors.textLight, marginTop: 4 }}>已解锁 {achievements.length} / {allAchievements.length} 个成就</p>
      </header>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {Object.entries(levelColors).map(([level, color]) => (
          <div key={level} className="card" style={{ flex: 1, textAlign: 'center', padding: 12 }}>
            <span style={{ fontSize: 20, color }}>{level === 'bronze' ? '🥉' : level === 'silver' ? '🥈' : level === 'gold' ? '🥇' : '💎'}</span>
            <p style={{ fontSize: 12, marginTop: 4 }}>{achievements.filter(a => a.achievement_level === level).length}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>戒烟时长成就</h3>
        {allAchievements.map((achievement, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 12,
              marginBottom: 8,
              borderRadius: 8,
              background: achievement.unlocked ? `${levelColors[achievement.level]}20` : colors.background,
              border: achievement.unlocked ? `2px solid ${levelColors[achievement.level]}` : 'none',
            }}
          >
            <span style={{ fontSize: 32 }}>
              {achievement.unlocked ? (achievement.level === 'bronze' ? '🥉' : achievement.level === 'silver' ? '🥈' : achievement.level === 'gold' ? '🥇' : '💎') : '🔒'}
            </span>
            <div style={{ marginLeft: 12 }}>
              <p style={{ fontWeight: 'bold', color: achievement.unlocked ? levelColors[achievement.level] : colors.textLight }}>
                {achievement.name}
              </p>
              <p style={{ fontSize: 12, color: colors.textLight }}>
                {achievement.unlocked ? '已解锁' : `${achievement.days}天后解锁`}
              </p>
            </div>
            {achievement.unlocked && (
              <span style={{ marginLeft: 'auto', fontSize: 20 }}>✓</span>
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </main>
  )
}