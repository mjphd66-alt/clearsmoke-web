'use client'

import { colors } from '@/theme/colors'

interface EnergyBarProps {
  energy: number
  maxEnergy: number
}

export function EnergyBar({ energy, maxEnergy }: EnergyBarProps) {
  const percentage = Math.min(100, Math.max(0, (energy / maxEnergy) * 100))
  const getEnergyColor = () => {
    if (energy >= 80) return colors.energyHigh
    if (energy >= 50) return colors.energyMedium
    return colors.energyLow
  }

  return (
    <div style={{ padding: '0 16px', marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 14, color: colors.textLight }}>能量值</span>
        <span style={{ fontSize: 14, fontWeight: 'bold', color: getEnergyColor() }}>{energy}/{maxEnergy}</span>
      </div>
      <div style={{
        height: 8,
        backgroundColor: colors.border,
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          backgroundColor: getEnergyColor(),
          borderRadius: 4,
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  )
}