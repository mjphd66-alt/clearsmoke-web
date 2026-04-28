'use client'

import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { setUser } from '@/store/slices/userSlice'
import { setSpirit } from '@/store/slices/spiritSlice'
import { userService, spiritService, getCurrentLevel } from '@/services/localStorage'
import { colors } from '@/theme/colors'
import { BottomNav } from '@/components/BottomNav'

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)
  const { spirit } = useSelector((state: RootState) => state.spirit)
  const { totalDays } = useSelector((state: RootState) => state.quit)

  const handleClearData = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
      // 重置为默认值
      dispatch(setUser(userService.get()))
      dispatch(setSpirit(spiritService.get()))
      router.push('/')
    }
  }

  return (
    <main className="container" style={{ paddingBottom: 80 }}>
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
          <span style={{ fontSize: 40 }}>{spirit?.type === 'tree' ? '🌱' : '🥚'}</span>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 'bold', marginTop: 16, color: colors.text }}>
          {user?.nickname || '戒烟者'}
        </h2>
      </header>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>戒烟进度</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: colors.textLight }}>当前关卡</span>
          <span style={{ fontWeight: 'bold', color: colors.primary }}>{getCurrentLevel(totalDays).name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: colors.textLight }}>戒烟天数</span>
          <span style={{ fontWeight: 'bold' }}>{totalDays} 天</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: colors.textLight }}>戒烟目标</span>
          <span style={{ fontWeight: 'bold' }}>{user?.quit_goal === 'immediate' ? '立即戒烟' : '循序渐进'}</span>
        </div>
      </div>

      {spirit && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>我的精灵</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: colors.textLight }}>精灵名称</span>
            <span style={{ fontWeight: 'bold' }}>{spirit.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: colors.textLight }}>精灵类型</span>
            <span style={{ fontWeight: 'bold' }}>{spirit.type === 'tree' ? '树木系列' : '动物系列'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: colors.textLight }}>能量值</span>
            <span style={{ fontWeight: 'bold', color: spirit.energy >= 80 ? colors.success : spirit.energy >= 50 ? colors.warning : colors.error }}>{spirit.energy}/100</span>
          </div>
        </div>
      )}

      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16 }}>健康恢复时间</h3>
        <div style={{ fontSize: 14, color: colors.textLight, lineHeight: 1.6 }}>
          <p>• 20分钟：心率和血压开始下降</p>
          <p>• 12小时：血中一氧化碳水平恢复正常</p>
          <p>• 2周：循环改善，肺功能增强</p>
          <p>• 1个月：咳嗽和呼吸短促减少</p>
          <p>• 1年：心脏病风险减半</p>
        </div>
      </div>

      <button
        style={{
          width: '100%',
          marginTop: 24,
          padding: 16,
          borderRadius: 12,
          background: colors.background,
          border: `1px solid ${colors.border}`,
          color: colors.textLight,
          fontSize: 16,
          cursor: 'pointer',
        }}
        onClick={handleClearData}
      >
        清除所有数据
      </button>

      <BottomNav />
    </main>
  )
}