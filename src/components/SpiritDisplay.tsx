'use client'

import { Spirit } from '@/types'
import { colors } from '@/theme/colors'
import { TREE_EVOLUTION, BIRD_EVOLUTION } from '@/utils/constants'

interface SpiritDisplayProps {
  spirit: Spirit | null
  days: number
  onPress?: () => void
}

export function SpiritDisplay({ spirit, days, onPress }: SpiritDisplayProps) {
  if (!spirit) return null

  const evolutionConfig = spirit.type === 'tree' ? TREE_EVOLUTION : BIRD_EVOLUTION
  const currentStage = evolutionConfig.find(s => s.stage === spirit.evolution_stage) || evolutionConfig[0]

  const getMood = () => {
    if (spirit.energy >= 80) return '😊'
    if (spirit.energy >= 50) return '😐'
    if (spirit.energy >= 30) return '😢'
    return '💔'
  }

  const getSpiritIcon = () => {
    if (spirit.type === 'tree') {
      const icons: Record<number, string> = { 1: '🌱', 2: '🌿', 3: '🌳', 4: '🌲' }
      return icons[spirit.evolution_stage] || '🌱'
    } else {
      const icons: Record<number, string> = { 1: '🥚', 2: '🐣', 3: '🦅' }
      return icons[spirit.evolution_stage] || '🥚'
    }
  }

  const getEncouragement = () => {
    if (spirit.energy >= 80) return '太棒了！继续保持！'
    if (spirit.energy >= 50) return '加油，我在等你保护我！'
    return '我好累，请坚持不吸烟哦~'
  }

  return (
    <div
      onClick={onPress}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 24,
        backgroundColor: colors.card,
        borderRadius: 16,
        marginTop: 16, marginBottom: 16,
        cursor: onPress ? 'pointer' : 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 80 }}>{getSpiritIcon()}</span>
        <span style={{ fontSize: 40, marginLeft: 8 }}>{getMood()}</span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>{spirit.name}</span>
        <span style={{ fontSize: 16, color: colors.primary, marginTop: 4, display: 'block' }}>{currentStage.name}</span>
      </div>
      <p style={{ fontSize: 14, color: colors.textLight, marginTop: 8, textAlign: 'center' }}>
        {getEncouragement()}
      </p>
    </div>
  )
}