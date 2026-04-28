'use client'

import { usePathname, useRouter } from 'next/navigation'
import { colors } from '@/theme/colors'

const tabs = [
  { key: 'home', label: '首页', icon: '🏠', path: '/home' },
  { key: 'checkin', label: '打卡', icon: '✅', path: '/checkin' },
  { key: 'achievement', label: '成就', icon: '🏆', path: '/achievement' },
  { key: 'profile', label: '我的', icon: '👤', path: '/profile' },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: colors.card,
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 0',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
      zIndex: 100,
      paddingBottom: 'calc(8px + env(safe-area-inset-bottom))',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => router.push(tab.path)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 0',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: pathname === tab.path ? colors.primary : colors.textLight,
            transition: 'color 0.2s',
          }}
        >
          <span style={{ fontSize: 24 }}>{tab.icon}</span>
          <span style={{ fontSize: 12, marginTop: 4 }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}