'use client'

import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

interface StatCardProps {
  icon: string
  label: string
  value: string
  unit: string
}

export function StatCard({ icon, label, value, unit }: StatCardProps) {
  return (
    <div style={{
      flex: 1,
      background: colors.card,
      borderRadius: 12,
      padding: spacing.md,
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <span style={{ fontSize: 24 }}>{icon}</span>
      <p style={{ fontSize: 12, color: colors.textLight, marginTop: 4 }}>{label}</p>
      <p style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, marginTop: 4 }}>
        {value}<span style={{ fontSize: 12, color: colors.textLight }}>{unit}</span>
      </p>
    </div>
  )
}