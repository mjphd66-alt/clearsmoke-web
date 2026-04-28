import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Achievement } from '../../types'

interface AchievementState {
  achievements: Achievement[]
  isLoading: boolean
}

const initialState: AchievementState = {
  achievements: [],
  isLoading: true,
}

export const achievementSlice = createSlice({
  name: 'achievement',
  initialState,
  reducers: {
    setAchievements: (state, action: PayloadAction<Achievement[]>) => {
      state.achievements = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    addAchievement: (state, action: PayloadAction<Achievement>) => {
      state.achievements.push(action.payload)
    },
  },
})

export const { setAchievements, setLoading, addAchievement } = achievementSlice.actions
export default achievementSlice.reducer