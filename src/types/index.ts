// 用户类型
export interface User {
  id: string
  email: string | null
  phone: string | null
  nickname: string | null
  avatar_url: string | null
  quit_goal: 'immediate' | 'gradual'
  smoking_years: number | null
  daily_cigarettes: number | null
  target_cigarettes: number | null
  created_at: string
}

// 精灵类型
export interface Spirit {
  id: string
  user_id: string
  name: string
  type: 'tree' | 'bird'
  level: number
  energy: number
  evolution_stage: number
  outfit: SpiritOutfit | null
  created_at: string
}

export interface SpiritOutfit {
  hat?: string
  clothing?: string
  effect?: string
}

// 戒烟记录类型
export interface QuitRecord {
  id: string
  user_id: string
  record_date: string
  is_smoked: boolean
  smoke_count: number
  trigger_factors: TriggerFactors | null
  energy_change: number
  tasks_completed: CompletedTasks | null
}

export interface TriggerFactors {
  time?: string
  location?: string
  trigger_type?: 'stress' | 'bored' | 'social' | 'after_meal' | 'other'
  emotion?: string
}

export interface CompletedTasks {
  checkin: boolean
  learn: boolean
  share: boolean
}

// 成就类型
export interface Achievement {
  id: string
  user_id: string
  achievement_type: string
  achievement_name: string
  achievement_level: 'bronze' | 'silver' | 'gold' | 'diamond'
  unlocked_at: string
}

// 关卡定义
export interface Level {
  level: number
  days: number
  name: string
  description: string
}

// 精灵进化阶段
export interface EvolutionStage {
  stage: number
  min_days: number
  name: string
  image_key: string
}

// API 响应类型
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}