import { Level, EvolutionStage } from '../types'

// 关卡配置
export const LEVELS: Level[] = [
  { level: 1, days: 1, name: '觉醒关', description: '开启戒烟旅程' },
  { level: 2, days: 3, name: '考验关', description: '度过初期戒断' },
  { level: 3, days: 7, name: '周里程碑', description: '一周坚持' },
  { level: 4, days: 14, name: '半月挑战', description: '习惯初步形成' },
  { level: 5, days: 21, name: '习惯关', description: '破除旧习惯' },
  { level: 6, days: 30, name: '月度Boss', description: '完整一个月' },
  { level: 7, days: 60, name: '稳固关', description: '巩固阶段' },
  { level: 8, days: 90, name: '季度Boss', description: '三个月里程碑' },
  { level: 9, days: 180, name: '半年Boss', description: '半年成就' },
  { level: 10, days: 365, name: '终极Boss', description: '一年通关' },
]

// 精灵进化阶段配置 - 树木系列
export const TREE_EVOLUTION: EvolutionStage[] = [
  { stage: 1, min_days: 0, name: '种子', image_key: 'seed' },
  { stage: 2, min_days: 7, name: '小树苗', image_key: 'sapling' },
  { stage: 3, min_days: 30, name: '大树', image_key: 'tree' },
  { stage: 4, min_days: 90, name: '森林守护者', image_key: 'forest_guardian' },
]

// 精灵进化阶段配置 - 动物系列
export const BIRD_EVOLUTION: EvolutionStage[] = [
  { stage: 1, min_days: 0, name: '蛋', image_key: 'egg' },
  { stage: 2, min_days: 7, name: '小鸟', image_key: 'bird' },
  { stage: 3, min_days: 30, name: '凤凰', image_key: 'phoenix' },
]

// 成就定义
export const ACHIEVEMENT_DEFINITIONS = {
  duration: [
    { days: 1, name: '觉醒勋章', level: 'bronze' },
    { days: 7, name: '坚持勋章', level: 'bronze' },
    { days: 30, name: '勇士勋章', level: 'silver' },
    { days: 100, name: '大师勋章', level: 'gold' },
    { days: 365, name: '传奇勋章', level: 'diamond' },
  ],
  challenge: [
    { count: 10, name: 'Boss克星', level: 'silver' },
  ],
}

// 每日能量配置
export const ENERGY_CONFIG = {
  daily_gain: 10,
  smoke_loss: 30,
  max_energy: 100,
}

// 健康恢复时间轴
export const HEALTH_RECOVERY = [
  { minutes: 20, description: '心率和血压开始下降' },
  { hours: 12, description: '血中一氧化碳水平恢复正常' },
  { weeks: 2, description: '循环改善，肺功能增强' },
  { months: 1, description: '咳嗽和呼吸短促减少' },
  { years: 1, description: '心脏病风险减半' },
]

// 香烟价格（用于计算省钱金额）
export const CIGARETTE_PRICE = 0.5 // 元/支