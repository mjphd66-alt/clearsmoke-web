// 本地存储服务 - 替代 Supabase
// 数据存储在 localStorage，适合个人使用和快速部署

import { User, Spirit, QuitRecord, Achievement } from '../types'
import { ENERGY_CONFIG, CIGARETTE_PRICE, ACHIEVEMENT_DEFINITIONS, LEVELS } from '../utils/constants'

const STORAGE_KEYS = {
  USER: 'clearsmoke_user',
  SPIRIT: 'clearsmoke_spirit',
  RECORDS: 'clearsmoke_records',
  ACHIEVEMENTS: 'clearsmoke_achievements',
}

// 默认用户
const defaultUser: User = {
  id: 'local-user',
  email: 'user@local',
  phone: null,
  nickname: '戒烟者',
  avatar_url: null,
  quit_goal: 'immediate',
  smoking_years: 5,
  daily_cigarettes: 20,
  target_cigarettes: 0,
  created_at: new Date().toISOString(),
}

// 默认精灵
const defaultSpirit: Spirit = {
  id: 'local-spirit',
  user_id: 'local-user',
  name: '清烟精灵',
  type: 'tree',
  level: 1,
  energy: 70,
  evolution_stage: 2,
  outfit: null,
  created_at: new Date().toISOString(),
}

// 存储助手
const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  },
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(value))
  },
}

// 用户服务
export const userService = {
  get: (): User => storage.get(STORAGE_KEYS.USER, defaultUser),
  set: (user: User): void => storage.set(STORAGE_KEYS.USER, user),
  update: (updates: Partial<User>): User => {
    const user = userService.get()
    const newUser = { ...user, ...updates }
    userService.set(newUser)
    return newUser
  },
}

// 精灵服务
export const spiritService = {
  get: (): Spirit => storage.get(STORAGE_KEYS.SPIRIT, defaultSpirit),
  set: (spirit: Spirit): void => storage.set(STORAGE_KEYS.SPIRIT, spirit),
  updateEnergy: (change: number): Spirit => {
    const spirit = spiritService.get()
    spirit.energy = Math.min(100, Math.max(0, spirit.energy + change))
    spiritService.set(spirit)
    return spirit
  },
  updateEvolution: (days: number): Spirit => {
    const spirit = spiritService.get()
    const stages = spirit.type === 'tree'
      ? [{ stage: 1, min: 0 }, { stage: 2, min: 7 }, { stage: 3, min: 30 }, { stage: 4, min: 90 }]
      : [{ stage: 1, min: 0 }, { stage: 2, min: 7 }, { stage: 3, min: 30 }]
    let newStage = 1
    for (const s of stages) {
      if (days >= s.min) newStage = s.stage
    }
    spirit.evolution_stage = newStage
    spiritService.set(spirit)
    return spirit
  },
}

// 戒烟记录服务
export const recordService = {
  getAll: (): QuitRecord[] => storage.get(STORAGE_KEYS.RECORDS, []),
  getToday: (): QuitRecord | null => {
    const today = new Date().toISOString().split('T')[0]
    const records = recordService.getAll()
    return records.find(r => r.record_date === today) || null
  },
  createCheckin: (): QuitRecord => {
    const today = new Date().toISOString().split('T')[0]
    const records = recordService.getAll()
    // 检查是否已打卡
    const existing = records.find(r => r.record_date === today)
    if (existing) {
      existing.tasks_completed = { checkin: true, learn: false, share: false }
      storage.set(STORAGE_KEYS.RECORDS, records)
      return existing
    }
    const newRecord: QuitRecord = {
      id: 'record-' + Date.now(),
      user_id: 'local-user',
      record_date: today,
      is_smoked: false,
      smoke_count: 0,
      trigger_factors: null,
      energy_change: ENERGY_CONFIG.daily_gain,
      tasks_completed: { checkin: true, learn: false, share: false },
    }
    records.unshift(newRecord)
    storage.set(STORAGE_KEYS.RECORDS, records)
    return newRecord
  },
  getStats: (): { totalDays: number; cigarettesAvoided: number; moneySaved: number } => {
    const records = recordService.getAll().filter(r => !r.is_smoked)
    const totalDays = records.length
    return {
      totalDays,
      cigarettesAvoided: totalDays * 20,
      moneySaved: totalDays * 20 * CIGARETTE_PRICE,
    }
  },
}

// 成就服务
export const achievementService = {
  getAll: (): Achievement[] => storage.get(STORAGE_KEYS.ACHIEVEMENTS, []),
  checkAndUnlock: (totalDays: number): Achievement[] => {
    const existing = achievementService.getAll()
    const unlocked: Achievement[] = []
    for (const def of ACHIEVEMENT_DEFINITIONS.duration) {
      if (totalDays >= def.days && !existing.find(a => a.achievement_name === def.name)) {
        const newAchievement: Achievement = {
          id: 'achievement-' + Date.now(),
          user_id: 'local-user',
          achievement_type: 'duration',
          achievement_name: def.name,
          achievement_level: def.level as 'bronze' | 'silver' | 'gold' | 'diamond',
          unlocked_at: new Date().toISOString(),
        }
        existing.push(newAchievement)
        unlocked.push(newAchievement)
      }
    }
    storage.set(STORAGE_KEYS.ACHIEVEMENTS, existing)
    return unlocked
  },
}

// 获取当前关卡
export const getCurrentLevel = (days: number) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (days >= LEVELS[i].days) return LEVELS[i]
  }
  return LEVELS[0]
}

// 获取下一关卡
export const getNextLevel = (days: number) => {
  const current = getCurrentLevel(days)
  const nextIndex = LEVELS.findIndex(l => l.level === current.level) + 1
  return LEVELS[nextIndex] || null
}